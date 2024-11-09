function ageBucket(age) {
    const age_clean = `cast(${age} as int64)`;
    return `case
              when ${age_clean} between 0 and 18 then "Under 18"
              when ${age_clean} between 19 and 35 then "19 to 35"
              when ${age_clean} between 36 and 50 then "36 to 50"
              else "50+"
            end`;
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
