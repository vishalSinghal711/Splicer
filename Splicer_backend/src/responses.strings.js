const responses = {
  //GENERAL
  NOT_AUTHORISED: 'NOT_AUTHORISED',

  //user

  //during login
  USERNAME_PASSWORD_MANDATORY: 'USERNAME_PASSWORD_MANDATORY'.toLowerCase(),
  //during login
  USER_NOT_FOUND: 'user_not_found',
  //during login
  INCORRECT_PASSWORD: 'INCORRECT_PASSWORD'.toLowerCase(),
  //general
  PARAMETER_NOT_NUMBER: 'PARAMETER_NOT_NUMBER'.toLowerCase(),
  //user prof update
  SUCCESSFULLY_UPDATED_USER: 'SUCCESSFULLY_UPDATED_USER'.toLowerCase(),

  //vendor update
  USER_MUST_BE_VENDOR_TO_UPDATE_PROFILE:
    'USER_MUST_BE_VENDOR_TO_UPDATE_PROFILE'.toLowerCase(),
  USER_MUST_BE_VENDOR_TO_ADD_BUSINESS:
    'USER_MUST_BE_VENDOR_TO_ADD_BUSINESS'.toLowerCase(),
  USER_MUST_BE_VENDOR_TO_UPDATE_BUSINESS:
    'USER_MUST_BE_VENDOR_TO_UPDATE_BUSINESS'.toLowerCase(),
  USER_MUST_HAVE_ATLEAST_ONE_BUSINESS_TO_UPDATE_BUSINESS:
    'USER_MUST_HAVE_ATLEAST_ONE_BUSINESS_TO_UPDATE_BUSINESS'.toLowerCase(),
  BUSINESS_NOT_BELONGS_TO_VENDOR: 'BUSINESS_NOT_BELONGS_TO_VENDOR',
  VENDOR_NOT_FOUND : 'VENDOR_NOT_FOUND'.toLowerCase(), //in case vendor deleted and id exist


  //business register
  BUSINESS_ADDED: 'BUSINESS_ADDED'.toLowerCase(),

  //if status
  USER_BLOCKED: 'user_blocked',
  USER_NOT_VENDOR: 'user_not_vendor',
  NO_BUSINESS_EXIST: 'no_business_exist',
  WRONG_PACKAGE_ID: 'wrong_package_id',
  PACKAGE_BLOCKED: 'package_blocked',

  NO_TRANSACTION_EXIST: 'NO_TRANSACTION_EXIST'.toLowerCase(),
};
module.exports = responses;
