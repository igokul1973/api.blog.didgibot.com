set -e

mongosh admin -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD <<EOF

const ADMIN_EMAIL = "$ADMIN_EMAIL" || "admin";
const ADMIN_PASSWORD = "$ADMIN_PASSWORD" || "some_password";
const ADMIN_PHONE = "$ADMIN_PHONE" || "+1-1111111111";
const ADMIN_FIRST_NAME = "$ADMIN_FIRST_NAME" || "Admin";
const ADMIN_LAST_NAME = "$ADMIN_LAST_NAME" || "Admin";
const MONGO_INITDB_ROOT_USERNAME =
    "$MONGO_INITDB_ROOT_USERNAME" || "admin";
const MONGO_INITDB_ROOT_PASSWORD =
    "$MONGO_INITDB_ROOT_PASSWORD" || "some_password";
const MONGO_INITDB_DB = '$MONGO_INITDB_DATABASE' || "db_name";

use $MONGO_INITDB_DATABASE

console.log('Will be using DB:', MONGO_INITDB_DB)
console.log('Will be using DB 2:', '$MONGO_INITDB_DATABASE')
console.log('Type:', typeof MONGO_INITDB_DB)

const newDate = new Date();

const user = {
    email: ADMIN_EMAIL,
    phone: ADMIN_PHONE,
    first_name: ADMIN_FIRST_NAME,
    last_name: ADMIN_LAST_NAME,
    ip: ADMIN_LAST_NAME,
    last_logged_at: newDate,
    created_at: newDate,
    updated_at: newDate,
};

console.log(`Creating initial user (${MONGO_INITDB_ROOT_USERNAME}) for ${MONGO_INITDB_DATABASE}... ------------------`);

db.users.insertOne(user);

console.log("Created initial user (" + MONGO_INITDB_ROOT_USERNAME + ") for (" + MONGO_INITDB_DATABASE + ") database... ------------------");

EOF
