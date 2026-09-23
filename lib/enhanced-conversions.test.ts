import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  buildEnhancedConversionUserData,
  normalizeUsPhoneE164,
} from './enhanced-conversions.ts';

describe('normalizeUsPhoneE164', () => {
  it('converts ###-###-#### to +1 and 10 digits', () => {
    assert.equal(normalizeUsPhoneE164('352-555-0100'), '+13525550100');
  });

  it('strips other punctuation and a leading country code', () => {
    assert.equal(normalizeUsPhoneE164('(352) 555-0100'), '+13525550100');
    assert.equal(normalizeUsPhoneE164('+1 352-555-0100'), '+13525550100');
    assert.equal(normalizeUsPhoneE164('13525550100'), '+13525550100');
  });

  it('rejects numbers that are not 10-digit US', () => {
    assert.equal(normalizeUsPhoneE164('352-555'), undefined);
    assert.equal(normalizeUsPhoneE164(''), undefined);
    assert.equal(normalizeUsPhoneE164('+44 20 7946 0958'), undefined);
  });
});

describe('buildEnhancedConversionUserData', () => {
  const contact = {
    email: ' Jane.Doe@Example.com ',
    phone: '352-555-0100',
    firstName: 'Jane',
    lastName: 'Doe',
    city: 'Clermont',
    state: 'fl',
    zipCode: ' 34711 ',
  };

  it('builds the documented Enhanced conversions user_data shape', () => {
    const userData = buildEnhancedConversionUserData(contact);

    assert.deepEqual(userData, {
      email: 'jane.doe@example.com',
      phone_number: '+13525550100',
      address: {
        first_name: 'jane',
        last_name: 'doe',
        city: 'clermont',
        region: 'FL',
        postal_code: '34711',
        country: 'US',
      },
    });
  });

  it('does not put the form phone format or a price on the payload', () => {
    const userData = buildEnhancedConversionUserData(contact);
    const serialized = JSON.stringify(userData);

    assert.equal(serialized.includes('352-555-0100'), false);
    assert.equal(serialized.includes('value'), false);
    assert.equal(serialized.includes('currency'), false);
    assert.equal(serialized.includes('street'), false);
  });

  it('omits an unusable phone and still sends email and address', () => {
    const userData = buildEnhancedConversionUserData({ ...contact, phone: '555' });

    assert.ok(userData);
    assert.equal(userData.phone_number, undefined);
    assert.equal(userData.email, 'jane.doe@example.com');
    assert.equal(userData.address.country, 'US');
    assert.equal(userData.address.postal_code, '34711');
  });

  it('returns undefined when email is blank', () => {
    assert.equal(
      buildEnhancedConversionUserData({ ...contact, email: '   ' }),
      undefined,
    );
  });
});
