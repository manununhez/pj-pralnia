import axios from 'axios'
import * as constant from '../helpers/constants'

const _apiHost = 'https://api.swps-pjatk-experiment.co/v5/' //'http://localhost:5000/'
const fetch_versions_url = 'versions'
const fetch_psform_url = 'psform'
const fetch_apptext_url = 'apptext'
const fetch_inituserdata_url = 'inituserdata'
const fetch_input_all_url = 'input-all'
const fetch_input_all_demo_url = 'input-all-demo'
const fetch_users_url = 'users'
const save_visualpattern_url = 'visualpattern'
const save_userinfo_url = 'userinfo'
const save_userlogtime_url = 'userlogtime'
const save_usegeneraldata_url = 'usergeneraldata'
const save_bargain_url = 'userbargain'
const save_attributes_url = 'userattribute'
// const save_ratings_url = 'userrating'
// const save_preferences_url = 'userpreference'
// const save_rating_preferences_url = 'userratingpreference'
// const save_brands_url = 'userbrand'
// const save_input_url = 'userinput'

async function request(url, params, method = 'GET') {

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    };

    if (params) {
        if (method === 'GET') {
            url += '?' + objectToQueryString(params);
        } else {
            options.data = JSON.stringify(params);
        }
    }

    const response = await axios(url, options);

    if (response.status !== 200) {
        return generateErrorResponse('The server responded with an unexpected status.');
    }

    return response.data;
}

function objectToQueryString(obj) {
    return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}

function generateErrorResponse(message) {
    return {
        status: 'error',
        message
    };
}

export function get(url, params) {
    return request(_apiHost + url, params);
}

export function create(url, params) {
    return request(_apiHost + url, params, 'POST');
}

//  function update(url, params) {
//   return request(url, params, 'PUT');
// }

// function remove(url, params) {
//   return request(url, params, 'DELETE');
// }

function save(url, data, callback) {
    create(url, data)
        .then((response) => {
            callback({ response });
        }, function (reason) {
            callback(false, reason);
        });
}

/**
 * 
 * @param {*} typeTask 
 * @param {*} callback 
 */
export function fetchUserInitialData(typeTask, callback) {
    let url = fetch_inituserdata_url + '/' + typeTask

    get(url, {})
        .then((response) => {
            let screens = [];
            for (let value of Object.values(response.screens)) {
                screens.push({
                    screen: value.screen_name,
                    type: value.screen_type
                });
            }

            callback({ screens });
        }, (response) => {
            callback(false, response);
        });
}

/**
 * 
 * @param {*} type 
 * @param {*} callback 
 */
export function fetchInput(callback) {
    let url = fetch_input_all_url

    get(url, {})
        .then((response) => {
            callback({ response });
        }, (response) => {
            callback(false, response);
        });
}

/**
 * 
 * @param {*} callback 
 */
export function fetchInputDemo(callback) {
    let url = fetch_input_all_demo_url

    get(url, {})
        .then((response) => {
            callback({ response });
        }, (response) => {
            callback(false, response);
        });
}
// /**
//  * Load app versions from the spreadsheet
//  * @param {*} callback 
//  */
export function fetchVersions(callback) {
    let url = fetch_versions_url

    get(url, {})
        .then((response) => {
            let versions = [];

            for (let value of Object.values(response)) {
                versions.push({ name: value.name, id: value.id });
            }

            callback({ versions });
        }, (response) => {
            callback(false, response);
        });
}

/**
 * 
 * @param {*} sex 
 * @param {*} callback 
 */
export function fetchUsers(callback) {
    let url = fetch_users_url

    get(url, {})
        .then((response) => {
            let users = [];
            let usersPartial = [];

            for (let value of Object.values(response)) {
                if (value.session_completed) {
                    users.push({ user_id: value.user_id, created_at: value.created_at });
                } else {
                    usersPartial.push({ user_id: value.user_id, created_at: value.created_at });
                }
            }
            callback({ users, usersPartial });
        }, (response) => {
            callback(false, response);
        });
}
/**
 * Load psychology questionaries input data from the spreadsheet
 * @param {*} callback 
 */
export function fetchPSFormData(sex, callback) {
    let url = fetch_psform_url + '/' + sex

    get(url, {})
        .then((response) => {
            let result = [];

            for (let value of Object.values(response)) {
                result.push({
                    sex: value.sex,
                    title: value.main_title,
                    titleFontSize: value.main_title_font_size,
                    questionCode: value.question_code,
                    question: value.question,
                    questionFontSize: value.question_font_size,
                    type: value.question_type,
                    answer: [value.answer_1, value.answer_2, value.answer_3, value.answer_4, value.answer_5, value.answer_6]
                });
            }

            callback({ result });
        }, (response) => {
            callback(false, response);
        });
}

/**
 * Load all the necessary Text structure for the app from the spreadsheet
 * @param {*} callback 
 */
export function fetchAppText(sex, callback) {
    let url = fetch_apptext_url + '/' + sex

    get(url, {})
        .then((response) => {
            let appText = [];

            for (let value of Object.values(response)) {
                appText.push({
                    sex: value.sex,
                    screen: value.name,
                    size: value.font_size,
                    text: value.text,
                });
            }

            callback({ appText });
        }, (response) => {
            callback(false, response);
        });
}

/**
 * Write results to GSheets
 * @param {*} data 
 * @param {*} callback 
 */
export function saveGeneralData(data, studyParams, callback) {
    save(save_usegeneraldata_url, usergeneraldata(data, studyParams), callback)
}

/**
 * Write results to GSheets
 * @param {*} data 
 * @param {*} callback 
 */
export function saveUserPSForm(data, callback) {
    save(fetch_psform_url, userpsform(data), callback)
}

/**
 * Write results to GSheets
 * @param {*} data 
 * @param {*} callback 
 */
export function saveUserInfo(data, callback) {
    save(save_userinfo_url, userinfo(data), callback)
}

/**
 * Write results to GSheets
 * @param {*} data 
 * @param {*} callback 
 */
export function saveUserLogTime(data, callback) {
    save(save_userlogtime_url, userlogtime(data), callback)
}

/**
 * Write results to GSheets
 * @param {*} data 
 * @param {*} callback 
 */
export function saveUserVisualPattern(data, callback) {
    save(save_visualpattern_url, uservisualpattern(data), callback)
}


/**
 * 
 * @param {*} data 
 * @param {*} callback 
 */
export function saveAttributes(data, callback) {
    save(save_attributes_url, userattributes(data), callback)
}

/**
 * Helpers to format the data in the correct outputvalue
 * for a specific sheet
 */

const usergeneraldata = (data, studyParams) => {

    let result = []; //should have exactly 14 columns (Column A to N), thats why we fill empty indexes with ""
    for (let j = 0; j < data.length; j++) {
        let output = data[j];
        if (output.task === constant.USER_FORM_SCREEN) {
            result.push([
                output.userID,
                output.task,
                output.data.sex,
                output.data.age,
                output.data.profession,
                output.data.yearsEduc,
                output.data.levelEduc,
                studyParams.PROLIFIC_PID,
                studyParams.STUDY_ID,
                studyParams.SESSION_ID,
                output.data.numerOsoby,
                constant.TEXT_EMPTY,
                constant.TEXT_EMPTY
            ]);
        } else if (output.task === constant.USER_INFO_SCREEN) {
            result.push([
                output.userID,
                output.task,
                output.data[0],
                output.data[1],
                output.data[2],
                output.data[3],
                output.data[4],
                output.data[5],
                output.data[6],
                output.data[7],
                output.data[8],
                output.data[9],
                constant.TEXT_EMPTY
            ]);
        } else if (output.task === constant.PSFORM_SCREEN) {
            result.push([
                output.userID,
                output.task,
                output.data.questionCode,
                output.data.answer,
                constant.TEXT_EMPTY,
                constant.TEXT_EMPTY,
                constant.TEXT_EMPTY,
                constant.TEXT_EMPTY,
                constant.TEXT_EMPTY,
                constant.TEXT_EMPTY,
                constant.TEXT_EMPTY,
                constant.TEXT_EMPTY,
                constant.TEXT_EMPTY
            ]);
        } else if (output.task === constant.PRALNIA_TASK_DEMO_SCREEN) {
            result.push([
                output.userID,
                output.task,
                output.data.questionID,
                output.data.questionNumber,
                output.data.selectedAnswer,
                output.data.isCorrectAnswer,
                output.data.supportType,
                output.data.buttonClicked,
                output.data.endDateTime,
                constant.TEXT_EMPTY,
                constant.TEXT_EMPTY,
                constant.TEXT_EMPTY,
                constant.TEXT_EMPTY
            ]);
        } else if (output.task === constant.PRALNIA_TASK_CONDITIONAL1_DEMO_SCREEN || output.task === constant.PRALNIA_TASK_CONDITIONAL2_DEMO_SCREEN) {
            result.push([
                output.userID,
                output.task,
                output.data.questionID,
                output.data.questionNumber,
                output.data.selectedAnswer,
                output.data.isCorrectAnswer,
                output.data.supportType,
                output.data.buttonClicked,
                output.data.endDateTime,
                constant.TEXT_EMPTY,
                constant.TEXT_EMPTY,
                constant.TEXT_EMPTY,
                constant.TEXT_EMPTY
            ]);
        } else if (output.task === constant.PRALNIA_TASK_CONDITIONAL1_SCREEN || output.task === constant.PRALNIA_TASK_CONDITIONAL2_SCREEN) {
            result.push([
                output.userID,
                output.task,
                output.data.questionID,
                output.data.questionNumber,
                output.data.selectedAnswer,
                output.data.isCorrectAnswer,
                output.data.supportType,
                output.data.buttonClicked,
                output.data.endDateTime,
                constant.TEXT_EMPTY,
                constant.TEXT_EMPTY,
                constant.TEXT_EMPTY,
                constant.TEXT_EMPTY
            ]);
        } else if (output.task === constant.PRALNIA_TASK_SCREEN) {
            result.push([
                output.userID,
                output.task,
                output.data.questionID,
                output.data.questionNumber,
                output.data.selectedAnswer,
                output.data.isCorrectAnswer,
                output.data.supportType,
                output.data.buttonClicked,
                output.data.endDateTime,
                constant.TEXT_EMPTY,
                constant.TEXT_EMPTY,
                constant.TEXT_EMPTY,
                constant.TEXT_EMPTY
            ]);
        } else if (output.task === constant.VISUAL_PATTERN_SCREEN || output.task === constant.VISUAL_PATTERN_DEMO_SCREEN) {
            let vp1 = output.data.map((item) => {
                return [
                    output.userID,
                    output.task,
                    (item.level + 1), //+1 to be more idiomatic: starts from level 1 insteado of level 0
                    item.dimention,
                    JSON.stringify(item.matrix),
                    JSON.stringify(item.matrixCheckResult),
                    item.matrixCheckResult.filter((element) => element === constant.TILE_SUCCESS).length, //we get the amount of success if any
                    item.matrixCheckResult.filter((element) => element === constant.TILE_ERROR).length, //we get the amount of errors if any
                    item.matrixCheckResult.filter((element) => element === constant.TILE_LEFT).length, //we get the amount of errors if any
                    item.retry,
                    item.timestamp,
                    constant.TEXT_EMPTY,
                    constant.TEXT_EMPTY
                ]
            });
            result = result.concat(vp1);
        } else if (output.task === constant.BARGAIN_SCREEN) {
            let bargains = output.data.map((item) => {
                return [
                    output.userID,
                    output.task,
                    item.storeNumber,
                    item.typeTask,
                    item.enterStoreTimestamp,
                    item.leaveStoreTimestamp,
                    item.productsSeen,
                    item.lastProductDisplayed,
                    item.bargainTakenNumber,
                    item.bargainShownNumber,
                    item.round,
                    item.bargainWronglyTakenNumber,
                    item.totalBargainsInStore
                ]
            });

            result = result.concat(bargains);
        }
    }

    return result;
}

function userinfo(data) {

    const { userID, userInfo, outputFormData, typeTask, studyParams } = data;

    let result = { info: [], form: [] };

    result.info.push([
        userID,
        userInfo.os.name,
        userInfo.os.version,
        userInfo.browser.name,
        userInfo.browser.version,
        userInfo.browser.major,
        userInfo.browser.language,
        userInfo.engine.name,
        userInfo.engine.version,
        userInfo.screen.width,
        userInfo.screen.height
    ]);

    result.form.push([
        userID,
        outputFormData.sex,
        outputFormData.age,
        outputFormData.profession,
        outputFormData.yearsEduc,
        outputFormData.levelEduc,
        typeTask,
        studyParams.PROLIFIC_PID,
        studyParams.STUDY_ID,
        studyParams.SESSION_ID,
        outputFormData.numerOsoby
    ]);


    return result;
}

function userlogtime(data) {
    // UserID	QuestionID	QuestionNumber	SelectedAnswer
    let result = [];

    const { logTimestamp, userID } = data;
    const { screen, timestamp } = logTimestamp;

    for (let i = 0; i < screen.length; i++) {
        result.push([
            userID,
            screen[i],
            timestamp[i],
            Math.floor((((i + 1) < screen.length) ? (timestamp[i + 1] - timestamp[i]) : 0) / 1000),
        ]);
    }

    return result;
}

function uservisualpattern(data) {
    const { userID, outputVisualPattern } = data;

    let resultDemo = outputVisualPattern.demo.map((output) => {
        return [
            userID,
            constant.VISUAL_PATTERN_DEMO_SCREEN,
            (output.level + 1),
            output.dimention,
            JSON.stringify(output.matrix),
            JSON.stringify(output.matrixCheckResult),
            output.matrixCheckResult.filter((item) => item === constant.TILE_SUCCESS).length,
            output.matrixCheckResult.filter((item) => item === constant.TILE_ERROR).length,
            output.matrixCheckResult.filter((item) => item === constant.TILE_LEFT).length,
            output.retry,
            output.timestamp,
        ];
    });


    let result = outputVisualPattern.task.map((output) => {
        return [
            userID,
            constant.VISUAL_PATTERN_SCREEN,
            (output.level + 1),
            output.dimention,
            JSON.stringify(output.matrix),
            JSON.stringify(output.matrixCheckResult),
            output.matrixCheckResult.filter((item) => item === constant.TILE_SUCCESS).length,
            output.matrixCheckResult.filter((item) => item === constant.TILE_ERROR).length,
            output.matrixCheckResult.filter((item) => item === constant.TILE_LEFT).length,
            output.retry,
            output.timestamp,
        ];
    });

    return resultDemo.concat(result);
}

function userpsform(data) {
    const { outputPSForm, userID } = data;

    let result = outputPSForm.map((item) => {
        return [
            userID,
            item.questionCode,
            item.answer,
        ]
    })

    return result;
}

function userattributes(data) {
    const { userID, outputAttribute } = data;

    let result = []

    for (let i = 0; i < outputAttribute.demo.length; i++) {
        result.push([
            userID,
            constant.PRALNIA_TASK_DEMO_SCREEN,
            outputAttribute.demo[i].questionID,
            outputAttribute.demo[i].questionNumber,
            outputAttribute.demo[i].selectedAnswer,
            outputAttribute.demo[i].isCorrectAnswer,
            outputAttribute.demo[i].supportType,
            outputAttribute.demo[i].buttonClicked,
            outputAttribute.demo[i].endDateTime
        ]);
    }

    for (let i = 0; i < outputAttribute.task.length; i++) {
        result.push([
            userID,
            constant.PRALNIA_TASK_SCREEN,
            outputAttribute.task[i].questionID,
            outputAttribute.task[i].questionNumber,
            outputAttribute.task[i].selectedAnswer,
            outputAttribute.task[i].isCorrectAnswer,
            outputAttribute.task[i].supportType,
            outputAttribute.task[i].buttonClicked,
            outputAttribute.task[i].endDateTime
        ]);
    }

    return result;
}