const R = require('ramda')

const config_utils = require('@cr-ste-justine/configs')

const get_env_variable = (key) => {
    return {'key': key, 'val': R.prop(key, process.env)}
}

const _load_mandatory_str_env_var = config_utils.load_mandatory_str_config(get_env_variable)
const _load_mandatory_json_env_var = config_utils.load_mandatory_json_config(get_env_variable)

const load_mandatory_str_env_var = (key) => {
    const result = _load_mandatory_str_env_var(key)
    if(result.isRight) {
        return result.value
    } else {
        console.log(`${result.value.key} configuration is undefined`)
        process.exit(1)
    }
}

const load_optional_str_env_var = (key, fallbackFn) => config_utils.load_optional_str_config(get_env_variable, fallbackFn)(key)

const load_mandatory_json_env_var = (key) => {
    const result = _load_mandatory_json_env_var(key)
    if(result.isRight) {
        return result.value
    } else {
        console.log(result.value.defaultMessage)
        process.exit(1)
    }
}

module.exports = {
    storeUrl: load_mandatory_str_env_var('STORE_URL'),
    storePassword: load_mandatory_str_env_var('STORE_PASSWORD'),
    storeDatabase: load_mandatory_str_env_var('STORE_DATABASE'),
    servicePort: load_mandatory_str_env_var('SERVICE_PORT'),
    storeLogger: load_optional_str_env_var('STORE_LOGGER', () => 'default'),
    httpLogger: load_optional_str_env_var('HTTP_LOGGER', () => 'default')
}