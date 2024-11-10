function ageBucket(age) {
    /**
     * Categorizes an age into buckets.
     *
     * @param {string} age - The age to categorize.
     * @returns {string} - Returns the age bucket as a string.
     *
     * @example
     * ageBucket('25') // returns "19 to 35"
     * ageBucket('60') // returns "50+"
     * ageBucket('10') // returns "Under 18"
     */
    const age_clean = `CAST(${age} as INT64)`;
    return `CASE
              WHEN ${age_clean} BETWEEN 0 AND 18 THEN "Under 18"
              WHEN ${age_clean} BETWEEN 19 AND 35 THEN "19 to 35"
              WHEN ${age_clean} BETWEEN 36 AND 50 THEN "36 to 50"
              ELSE "50+"
            END`;
}

function createHash(field) {
    /**
     * Creates a hash from a field using MD5.
     *
     * @param {string} field - The field to hash.
     * @returns {string} - Returns a query string that calculates the MD5 hash of the field.
     *
     * @example
     * createHash('user_name') // returns "(TO_BASE64(MD5(IFNULL(NULLIF(UPPER(TRIM(CAST(user_name AS STRING))), ''), '^^'))))"
     */
    return `(TO_BASE64(MD5(IFNULL(NULLIF(UPPER(TRIM(CAST(${field} AS STRING))), ''), '^^'))))`;
}

function validateEmail(email) {
    /**
     * Validates an email address.
     *
     * @param {string} email - The email address to validate.
     * @returns {string} - Returns a query string that checks the validity of the email address.
     *
     * @example
     * validateEmail('test@example.com') // returns "SELECT CASE WHEN NET.REG_DOMAIN('domain.com') IS NULL THEN FALSE WHEN REGEXP_CONTAINS(LOWER('test@example.com'), "^[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$") THEN TRUE ELSE FALSE END"
     */
    return `SELECT
    CASE
        WHEN NET.REG_DOMAIN('domain.' || ARRAY_REVERSE(SPLIT(LOWER(${email}), '.'))[SAFE_OFFSET(0)]) IS NULL THEN FALSE
        WHEN REGEXP_CONTAINS(LOWER(${email}), "^[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$") THEN TRUE
        ELSE FALSE
    END`;
}

function validateAndConvertMobile(mobile) {
    /**
     * Validates and converts a mobile number string to a standardized format.
     *
     * @param {string} mobile - The mobile number string to validate and convert.
     * @returns {string|null} - Returns a standardized mobile number string in the format '+61XXXXXXXX' if the input is valid, otherwise returns null.
     * 
     * @example
     * validateAndConvertMobile('0412345678') // returns '+61412345678'
     * validateAndConvertMobile('+61 412 345 678') // returns '+61412345678'
     * validateAndConvertMobile('61412345678') // returns '+61412345678'
     * validateAndConvertMobile('1234567890') // returns null
     */
    return `CASE 
        WHEN REGEXP_CONTAINS(REPLACE(REPLACE(${mobile}, '+', ''), ' ', ''), r'^0?4[0-9]{8}$|^614[0-9]{8}$')
        THEN '+61' || RIGHT(REPLACE(REPLACE(${mobile}, '+', ''), ' ', ''), 9)
        ELSE NULL
    END`;
}

function formatTimestampSeconds(seconds) {
    /**  
    * Handles timestamp seconds with fractional seconds (FLOAT64) and converts to TIMESTAMP_MICROS
    * If more than 6 decimal places are present, rounds to 6 decimal places before converting to microseconds
    * Example: 1617235959.123456 -> 1617235959123456 (TIMESTAMP_MICROS)
    * @param {FLOAT64} seconds - Timestamp seconds with fractional seconds
    * OR
    * @param {INT64} seconds - Timestamp seconds
    * @return Query string to convert timestamp seconds to TIMESTAMP_MICROS
    */
    return `TIMESTAMP_MICROS(CAST(SAFE_MULTIPLY(ROUND(SAFE_CAST(${seconds} as BIGNUMERIC), 6), 1000000) AS INT64))`;
}


// Explicitly export functions
module.exports = {
    ageBucket,
    createHash,
    validateEmail,
    validateAndConvertMobile,
    formatTimestampSeconds
};
