function ageBucket(age) {
    const age_clean = `CAST(${age} as INT64)`;
    return `CASE
              WHEN ${age_clean} BETWEEN 0 AND 18 THEN "Under 18"
              WHEN ${age_clean} BETWEEN 19 AND 35 THEN "19 to 35"
              WHEN ${age_clean} BETWEEN 36 AND 50 THEN "36 to 50"
              ELSE "50+"
            END`;
}

function createHash(field) {
    return `(TO_BASE64(MD5(IFNULL(NULLIF(UPPER(TRIM(CAST(${field} AS STRING))), ''), '^^'))))`;
}

function validateEmail(email) {
    return `SELECT
    CASE
        WHEN NET.REG_DOMAIN('domain.' || ARRAY_REVERSE(SPLIT(LOWER(${email}), '.'))[SAFE_OFFSET(0)]) IS NULL THEN FALSE
        WHEN REGEXP_CONTAINS(LOWER(${email}), "^[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])$") THEN TRUE
        ELSE FALSE
    END`;
}


module.exports = {
    ageBucket,
    createHash,
    validateEmail
};
