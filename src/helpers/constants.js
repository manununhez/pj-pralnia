export const MODAL_TYPE_STORE = "S"
export const MODAL_TITLE = "Ups!"
export const LIGHT_GRAY = "#e9ecef"; //lighter
export const WHITE = "white";
export const BLUE = "#123abc";
export const GREEN = "green";
export const RED = "red";
export const BLACK = "black";
export const ALLEGRO_ORANGE = "#ff5a00";
export const accentColor = "#5cb7b7";
export const PRODUCT_MENU_BG_COLORS = [LIGHT_GRAY, "lightsteelblue", "antiquewhite", "beige", "lightblue", "cornsilk", "aliceblue", "thistle"]

export const TEXT_EMPTY = "";

//MultiAttribute
export const INDEX_HEADER_TEXT = "index_header_"
export const INDEX_HEADER = {
    PRODUCT_1: INDEX_HEADER_TEXT + "0",
    PRODUCT_2: INDEX_HEADER_TEXT + "1",
    PRODUCT_3: INDEX_HEADER_TEXT + "2"
}
export const INDEX_HEADER_TOP = -198
export const modaltStyle = {
    position: "fixed",
    top: "35%",
    left: "35%",
    ransform: "translate(-40%, -40%)"
}
export const ItemTypes = {
    PRODUCT_1: "product1",
    PRODUCT_2: "product2",
    PRODUCT_3: "product3"
};

export const ItemTypesID = {
    PRODUCT_1: "columnProduct1",
    PRODUCT_2: "columnProduct2",
    PRODUCT_3: "columnProduct3"
};

export const attributeListsForDemo = [
    {
        id: 31, showFeedback: "YES", showVisualStack: "YES", correctAnswer: "3", attributes: [
            { id: "A3", p1: 0, p2: 0, p3: 1, name: "Klasa energetyczna", valueP1: "A+", valueP2: "A+", valueP3: "A++" },
            { id: "A5", p1: 1, p2: 0, p3: 0, name: "Zużycie wody", valueP1: "40", valueP2: "50", valueP3: "50" },
            { id: "A4", p1: 0, p2: 1, p3: 1, name: "Poziom hałasu", valueP1: "50", valueP2: "45", valueP3: "45" },
            { id: "A6", p1: 0, p2: 1, p3: 0, name: "Program szybki", valueP1: "brak", valueP2: "jest", valueP3: "brak" },
            { id: "A2", p1: 0, p2: 1, p3: 1, name: "Pojemność bębna", valueP1: "4", valueP2: "10", valueP3: "10" },
            { id: "A1", p1: 1, p2: 0, p3: 1, name: "Maksymalne obroty", valueP1: "1400", valueP2: "1200", valueP3: "1400" },
        ]
    },
    {
        id: 32, showFeedback: "YES", showVisualStack: "YES", correctAnswer: "1", attributes: [
            { id: "A3", p1: 0, p2: 0, p3: 1, name: "Klasa energetyczna", valueP1: "A", valueP2: "A", valueP3: "A++" },
            { id: "A5", p1: 1, p2: 1, p3: 0, name: "Zużycie wody", valueP1: "45", valueP2: "45", valueP3: "65" },
            { id: "A4", p1: 1, p2: 0, p3: 1, name: "Poziom hałasu", valueP1: "60", valueP2: "70", valueP3: "60" },
            { id: "A6", p1: 1, p2: 0, p3: 0, name: "Program szybki", valueP1: "jest", valueP2: "brak", valueP3: "brak" },
            { id: "A2", p1: 0, p2: 0, p3: 0, name: "Pojemność bębna", valueP1: "4", valueP2: "4", valueP3: "4" },
            { id: "A1", p1: 0, p2: 1, p3: 0, name: "Maksymalne obroty", valueP1: "1000", valueP2: "1400", valueP3: "1000" },
        ]
    },
    {
        id: 33, showFeedback: "YES", showVisualStack: "NO", correctAnswer: "3", attributes: [
            { id: "A3", p1: 0, p2: 0, p3: 1, name: "Klasa energetyczna", valueP1: "A", valueP2: "A", valueP3: "A++" },
            { id: "A5", p1: 1, p2: 0, p3: 0, name: "Zużycie wody", valueP1: "45", valueP2: "65", valueP3: "65" },
            { id: "A4", p1: 0, p2: 1, p3: 1, name: "Poziom hałasu", valueP1: "70", valueP2: "60", valueP3: "60" },
            { id: "A6", p1: 0, p2: 1, p3: 0, name: "Program szybki", valueP1: "brak", valueP2: "jest", valueP3: "brak" },
            { id: "A2", p1: 1, p2: 1, p3: 0, name: "Pojemność bębna", valueP1: "8", valueP2: "8", valueP3: "4" },
            { id: "A1", p1: 1, p2: 0, p3: 1, name: "Maksymalne obroty", valueP1: "1400", valueP2: "1000", valueP3: "1400" },
        ]
    }
];

//App versions
export const EXPERIMENT_TYPE_LONG = "LONG"
export const EXPERIMENT_TYPE_SHORT = "SHORT"
export const EXPERIMENT_TYPE_BASIC = "BASIC"
export const EXPERIMENT_TYPE_TASK_PATHNAME = "/task"

//General config parameters
export const SCENARIOS = [EXPERIMENT_TYPE_LONG, EXPERIMENT_TYPE_SHORT]
export const YEARS_EDUCATION_LIMIT = 11;
export const PARTICIPANTS_GROUPS = [
    { minAge: 19, maxAge: 30 },
    { minAge: 42, maxAge: 53 },
    { minAge: 65, maxAge: 76 }
]

//MultiAttribute
export const FIRST_TASK_PROPERTIES_TOTAL = 6;
export const FIRST_RADIO_VALUE = "1";
export const SECOND_RADIO_VALUE = "2";
export const THIRD_RADIO_VALUE = "3";
export const SHOW_FEEDBACK_TRUE = "YES";
export const SHOW_FEEDBACK_NO = "NO";

//Visual Pattern
export const VISUAL_PATTERN = "VisualPattern"
export const TILE_SUCCESS = 1;
export const TILE_EMPTY = 0;
export const TILE_ERROR = 2;
export const TILE_LEFT = 3;
export const VISUAL_PATTERN_DIMENTION = [
    [3, 3, 5], //row, column, amount of blue squares
    [3, 4, 6],
    [4, 4, 8],
    [4, 5, 10],
    [5, 5, 12]
];
export const VISUAL_PATTERN_DEMO_DIMENTION = [
    [2, 2, 3], //row, column, amount of blue squares
    [2, 3, 4]
];
export const VISUAL_PATTERN_TIMESCREEN_SECS = 2;
export const VISUAL_PATTERN_RETRY_ATTEMPTS = 2;
export const VISUAL_PATTERN_DEMO_RETRY_ATTEMPTS = 1;

//SYNC
export const STATE_SYNCING = 2;
export const STATE_SYNC = 1;
export const STATE_NOT_SYNC = 0;
export const SYNC_AMOUN_ITEMS = 3;
export const ONE_SECOND_MS = 1000;

// Form IDs
export const FORM_SEX_ID = "radioSex";
export const FORM_AGE_ID = "age";
export const FORM_PROFESSION_ID = "profession";
export const FORM_YEARS_EDUC_ID = "yearsEduc";
export const FORM_LEVEL_EDUC_ID = "levelEducationSelect";
export const FORM_AGE_TITLE = "Age";
export const FORM_PROFESSION_TITLE = "Profession";
export const FORM_YEARS_EDUC_TITLE = "Number of years of formal education";
export const FORM_YEARS_EDUC_TITLE_DESC = "(ended with a certificate or a diploma only: e.g., 8 years of primary school + 4 years of high school = 12 years)"
export const FORM_LEVEL_EDUC_TITLE = "Level of education";
export const FORM_SEX_TITLE = "Sex (M/F)";
export const FORM_LEVEL_EDUC_DEFAULT = "Select...";
export const FORM_LEVEL_EDUC_INITIAL = "Primary";
export const FORM_LEVEL_EDUC_MIDDLE = "Secondary";
export const FORM_LEVEL_EDUC_SUPERIOR = "Higher";
export const FEMALE_VALUE = "F";
export const MALE_VALUE = "M";

//Footer
export const TEXT_FOOTER = "Press SPACEBAR to continue";
export const TEXT_FOOTER_ENTER = "Press ENTER to continue";

//RATING bar
export const INACTIVE_STAR = '#d1d1cf';
export const ACTIVE_STAR = '#bf162e'; //Yellow: #ffd700
export const HIDDEN_STAR = '#ffffff';

//FONT SIZES
export const FONT_SIZE_HEADING1 = "HEADING 1";
export const FONT_SIZE_HEADING2 = "HEADING 2";
export const FONT_SIZE_HEADING3 = "HEADING 3";
export const FONT_SIZE_HEADING4 = "HEADING 4";
export const FONT_SIZE_HEADING5 = "HEADING 5";
export const FONT_SIZE_HEADING6 = "HEADING 6";

//PSFORM
export const INPUT_TYPE = "input";
export const MULTIPLE_CHOICES_TYPE = "multiple_choice";

//keyboard related
export const SPACE_KEY_CODE = 32;
export const ENTER_KEY_CODE = 13;
export const EVENT_KEY_DOWN = "keydown";
export const EVENT_BEFORE_UNLOAD = "beforeunload";
export const EVENT_UNLOAD = "unload";

//screen names
export const USER_INFO_SCREEN = "UserInfo";
export const USER_FORM_SCREEN = "UserForm";
export const INSTRUCTION_SCREEN = "Instruction";
export const PSFORM_SCREEN = "PsychologyForm";
export const VISUAL_PATTERN_SCREEN = "VisualPatternTask";
export const VISUAL_PATTERN_DEMO_SCREEN = "VisualPatternTaskDemo";
export const BARGAIN_DEMO_INSTRUCTION_COND = "BargainDemoTaskInstructionCond"
export const BARGAIN_DEMO_INSTRUCTION_COND1 = "BargainDemoTaskInstructionCond1";
export const BARGAIN_DEMO_INSTRUCTION_COND2 = "BargainDemoTaskInstructionCond2";
export const BARGAIN_DEMO_SCREEN = "BargainDemoTask";
export const BARGAIN_DEMO_INSTRUCTION_BEFORE_FINISH = "BargainDemoTaskInstructionBeforeFinish";
export const BARGAIN_DEMO_FINISH_INSTRUCTION = "BargainDemoTaskInstructionFinish";
export const BARGAIN_SCREEN = "BargainTask";
export const MULTRIATTRIBUTE_DEMO_SCREEN = "MultiAttributeTaskDemo";
export const MULTRIATTRIBUTE_SCREEN = "MultiAttributeTask";


//CSV input stores
export const STORES_SHORT_TYPE = "Stores-short";
export const STORES_LONG_TYPE = "Stores-long";

//General App messages KEYS
export const FORM_AGE_ALERT_ERROR = "The Age field cannot be left blank.";//Age field cannot be empty
export const FORM_YEARS_EDUC_ALERT_ERROR = "The Years of Formal Education field cannot be left blank.";//Years Education field cannot be empty!
export const FORM_PROFESSION_ALERT_ERROR = "The Profession field cannot be left blank.";//Profession field cannot be empty!
export const FORM_SEX_ALERT_ERROR = "The Sex field cannot be left blank.";//Age field cannot be empty
export const FORM_EDUC_LEVEL_ALERT_ERROR = "Please select your Level of education.";//You need to select an education level
export const PSFORM_SELECT_ALERT_ERROR = "First you need to answer all the questions.";//You need to complete the questions first!
export const PARTICIPANTS_QUOTA_FULL_ALERT_ERROR = "We are sorry, but unfortunately you do not meet all the conditions for participating in the study or the number of eligible participants is exceeded."; //We are sorry, but unfortunately you do not meet all the conditions for participating in the study or the number of eligible participants is already exceeded
export const SESSION_TIMEOUT_MESSAGE = "The session has been closed due to the passage of time;";
export const VISUAL_PATTERN_RESULTS_PRESS_SPACE = "Press SPACEBAR to go to the next board.";
export const VISUAL_PATTERN_RESULTS_FAILED = "Unfortunately, you did not manage to select all the boxes correctly.";
export const VISUAL_PATTERN_RESULTS_CORRECT = "Bravo! You have successfully checked all the boxes.";
export const VISUAL_PATTERN_TEXT_START_PRESS_SPACE = "Press the spacebar to submit your solution.";
export const VISUAL_PATTERN_INSTRUCTION = "Try to recreate the pattern displayed on the previous screen. You select and deselect the boxes by clicking on them with the left mouse button.";
export const VISUAL_PATTERN_CORRECT_RESULTS = "Correct pattern"
export const VISUAL_PATTERN_USER_RESULTS = "Your answer"

export const BARGAIN_CORRECT_SELECTED_ALERT_MESSAGE = (bargainCounter) => {
    if (bargainCounter === 1) {
        return `${bargainCounter} bargain in basket.`
    } else {
        return `${bargainCounter} bargains in basket.`
    }
}
export const BARGAIN_ERROR_SELECTED_ALERT_MESSAGE = "This is not a bargain."
export const BARGAIN_MISSED_SELECTED_ALERT_MESSAGE = (numberOfBargain) => {
    if (numberOfBargain === 1) {
        return `${numberOfBargain} missed bargain.`
    } else {
        return `${numberOfBargain} missed bargains.`
    }
}

export const STORES_NOT_AVAILABLE = "No more stores available. Please wait."
export const MIDDLE_EXPERIMENT_ALERT = "You reached the middle of the task. The travel time between stores will change now."
export const TOUR_PRODUCT_BELT = "This is the product belt."
export const TOUR_BARGAIN = "This is a bargain."
export const TOUR_NOT_BARGAIN = "This is not a bargain."
export const TOUR_BARGAIN_CRITERIA = "A bargain is a product with a discount >= 50% and rating >= 4 stars."
export const TOUR_BARGAIN_SELECTION = "Select the bargain by clicking the left mouse button."