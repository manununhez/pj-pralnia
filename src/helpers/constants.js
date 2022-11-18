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

export const ButtonClicked = {
    NO_BUTTON_CLICKED: 0,
    READY_BAR_BUTTON_CLICKED: 1,
    BUILD_BAR_BUTTON_CLICKED: 2
}

export const SupportType = {
    NO_BARS_SHOWN: 0,
    READY_BARS_SHOWN: 1,
    USER_BUILT_BARS: 2,
    BUTTON_READY_BAR_AVAILABLE: 3,
    BUTTONS_ARRANGE_AND_READY_BAR_AVAILABLE: 4
}

//PreferenceTask
export const ATTRIBUTE = {
    data:
    {
        id: ["A1", "A2", "A3", "A4", "A5", "A6"],
        text: ["max prędkość wirowania (obr/min)", "pojemność bębna (kg)",
            "klasa energetyczna", "poziom hałasu (db)", "zużycie wody (l)",
            "program szybki"],
        value: [
            ["800", "1000", "1200", "1400", "1600"],
            ["4", "5", "6", "7", "8", "9", "10"],
            ["E", "D", "C", "B"],
            ["70", "65", "60", "55", "50", "45", "40"],
            ["70", "60", "50", "40", "30"],
            ["brak", "jest"]
        ],
        prefix: ["Min ", "Min ", "Min ", "Max ", "Max ", ""],
        sufix: [" obr/min", " kg", "", "db", "l", ""]
    }
}

//RatingTask
export const ATTRIBUTE_CUSTOM = {
    data:
    {
        id: ["A6", "A5", "A4", "A3", "A2", "A1"],
        position: [6, 5, 4, 3, 2, 1],
        text: [
            "klasa energetyczna",
            "zużycie wody",
            "poziom hałasu",
            "program szybki",
            "pojemność bębna",
            "max prędkość wirowania"
        ]
    }
}

//RatingPreferenceTask
export const ATTRIBUTE_FOURTH_TASK = {
    data:
    {
        id: ["AFT1", "AFT2", "AFT3", "AFT4", "AFT5", "AFT6", "AFT7", "AFT8", "AFT9"],
        text: [
            "cena",
            "marka",
            "rozdzielczość aparatu (Mpix)",
            "pojemność baterii (mAh)",
            "pamięć RAM (GB)",
            "przekątna wyświetlacza",
            "rozdzielczość ekranu",
            "liczba rdzeni procesora",
            "ocena klientów"
        ]
    }
}

//BrandTask
export const BRANDS = [
    "Electrolux", "Whirlpool", "Candy Hoover", "Bosch", "Siemens", "LG Electronics", "Samsung", "Miele", "Vestel",
    "Amica", "Beko", "MPM", "Indesit", "SMEG"
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
export const FORM_NUMER_OSOBY = "numerOsoby";
export const FORM_PROFESSION_ID = "profession";
export const FORM_YEARS_EDUC_ID = "yearsEduc";
export const FORM_LEVEL_EDUC_ID = "levelEducationSelect";
export const FORM_AGE_TITLE = "Wiek";
export const FORM_PROFESSION_TITLE = "Zawód";
export const FORM_YEARS_EDUC_TITLE = "Lata formalnej edukacji ";
export const FORM_YEARS_EDUC_TITLE_DESC = "(tylko etapy kończące się formalnym świadectwem: podstawowe, średnie, wyższe: np 8 lat szkoły podstawowej + 4 lata liceum = 12 lat)"
export const FORM_LEVEL_EDUC_TITLE = "Poziom wykształcenia";
export const FORM_SEX_TITLE = "Płeć (M/K)";
export const FORM_LEVEL_EDUC_DEFAULT = "Wybierz...";
export const FORM_LEVEL_EDUC_INITIAL = "Podstawowe";
export const FORM_LEVEL_EDUC_MIDDLE = "Średnie";
export const FORM_LEVEL_EDUC_SUPERIOR = "Wyższe";
export const FEMALE_VALUE = "F";
export const MALE_VALUE = "M";

//Footer
export const TEXT_FOOTER = "Naciśnij spację, aby przejść dalej";
export const TEXT_FOOTER_ENTER = "Naciśnij Enter, aby przejść dalej";

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
export const PRALNIA_TASK_SCREEN = "PralniaTask";
export const PRALNIA_TASK_DEMO_SCREEN = "PralniaTaskDemo";

export const PRALNIA_TASK_CONDITIONAL1_DEMO_SCREEN = "PralniaTaskDemoConditional1";
export const PRALNIA_TASK_CONDITIONAL1_1_DEMO_SCREEN = "PralniaTaskDemoConditional1-1";
export const PRALNIA_TASK_CONDITIONAL1_2_DEMO_SCREEN = "PralniaTaskDemoConditional1-2";
export const PRALNIA_TASK_CONDITIONAL1_3_DEMO_SCREEN = "PralniaTaskDemoConditional1-3";
export const PRALNIA_TASK_CONDITIONAL1_4_DEMO_SCREEN = "PralniaTaskDemoConditional1-4";
export const PRALNIA_TASK_CONDITIONAL1_SCREEN = "PralniaTaskConditional1";
export const PRALNIA_TASK_CONDITIONAL1_1_SCREEN = "PralniaTaskConditional1-1";
export const PRALNIA_TASK_CONDITIONAL1_2_SCREEN = "PralniaTaskConditional1-2";
export const PRALNIA_TASK_CONDITIONAL1_3_SCREEN = "PralniaTaskConditional1-3";

export const PRALNIA_TASK_CONDITIONAL2_DEMO_SCREEN = "PralniaTaskDemoConditional2";
export const PRALNIA_TASK_CONDITIONAL2_1_DEMO_SCREEN = "PralniaTaskDemoConditional2-1";
export const PRALNIA_TASK_CONDITIONAL2_2_DEMO_SCREEN = "PralniaTaskDemoConditional2-2";
export const PRALNIA_TASK_CONDITIONAL2_3_DEMO_SCREEN = "PralniaTaskDemoConditional2-3";
export const PRALNIA_TASK_CONDITIONAL2_4_DEMO_SCREEN = "PralniaTaskDemoConditional2-4";
export const PRALNIA_TASK_CONDITIONAL2_SCREEN = "PralniaTaskConditional2";
export const PRALNIA_TASK_CONDITIONAL2_1_SCREEN = "PralniaTaskConditional2-1";
export const PRALNIA_TASK_CONDITIONAL2_2_SCREEN = "PralniaTaskConditional2-2";
export const PRALNIA_TASK_CONDITIONAL2_3_SCREEN = "PralniaTaskConditional2-3";

// export const RATING_TASK_SCREEN = "RatingTask";
// export const BRAND_TASK_SCREEN = "BrandTask";
// export const INPUT_TASK_SCREEN = "InputTask";
// export const PREFERENCE_TASK_SCREEN = "PreferenceTask";
// export const RATING_PREFERENCE_TASK_SCREEN = "RatingPreferenceTask";
export const REWARD_TASK_SCREEN = "RewardTask";
//CSV input stores
export const STORES_SHORT_TYPE = "Stores-short";
export const STORES_LONG_TYPE = "Stores-long";

//Rewards
export const REWARD_BONUS_MESSAGE = (bonus) => { return `W nagrodę otrzymasz dodatkowo ${bonus} punktów.` };
export const REWARD_RESULT_MESSAGE = (result) => { return `Udało Ci się poprawnie rozwiązać ${result}% zadań dotyczących wyboru pralek.` } //`You’ve solved ${result}% decision tasks correctly.`
export const REWARD_INPUT = { threshold: 60, bonusPoint: 50 }

//General App messages KEYS
export const FORM_NUMER_OSOBY_ALERT_ERROR = "Pole Numer osoby badanej nie może pozostać puste.";//Number osoby field cannot be empty
export const FORM_AGE_ALERT_ERROR = "Pole Wiek nie może pozostać puste.";//Age field cannot be empty
export const FORM_YEARS_EDUC_ALERT_ERROR = "Pole Lata formalnej edukacji nie może pozostać puste.";//Years Education field cannot be empty!
export const FORM_PROFESSION_ALERT_ERROR = "Pole Zawód nie może pozostać puste.";//Profession field cannot be empty!
export const FORM_SEX_ALERT_ERROR = "Pole Sex nie może pozostać puste.";//Age field cannot be empty
export const FORM_EDUC_LEVEL_ALERT_ERROR = "Wybierz swój poziom wykształcenia.";//You need to select an education level
export const PSFORM_SELECT_ALERT_ERROR = "Najpierw należy odpowiedzieć na wszystkie pytania.";//You need to complete the questions first!
export const PARTICIPANTS_QUOTA_FULL_ALERT_ERROR = "Przepraszamy, ale niestety nie spełniasz wszystkich warunków uczestnictwa w badaniu lub przekroczona jest liczbę osób, która może wziąć w nim udział."; //We are sorry, but unfortunately you do not meet all the conditions for participating in the study or the number of eligible participants is already exceeded
export const SESSION_TIMEOUT_MESSAGE = "Sesja została zamknięta z powodu upływu czasu";


export const VISUAL_PATTERN_INSTRUCTION = "Spróbuj odtworzyć wzór wyświetlony na poprzednim ekranie. Zaznaczasz i odznaczasz pola klikając na nie lewym przyciskiem myszy.";
export const VISUAL_PATTERN_CORRECT_RESULTS = "Poprawny wzór"
export const VISUAL_PATTERN_USER_RESULTS = "Twoje zaznaczenie"
export const VISUAL_PATTERN_TEXT_START_PRESS_SPACE = "Naciśnij spację, aby przesłać swoje rozwiązanie.";
export const VISUAL_PATTERN_RESULTS_CORRECT = "Brawo! Udało Ci się poprawnie zaznaczyć wszystkie pola.";
export const VISUAL_PATTERN_RESULTS_FAILED = "Niestety nie udało Ci się poprawnie zaznaczyć wszystkich pól.";
export const VISUAL_PATTERN_RESULTS_PRESS_SPACE = "Naciśnij spację, aby przejść do kolejnej planszy.";

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


export const PRALNIA_TASK_TITLE_M = "Proszę wybrać najlepszą pralkę, korzystając z myszy i zaznaczając jedną z pralek."
export const PRALNIA_TASK_TITLE_F = "Proszę wybrać najlepszą pralkę, korzystając z myszy i zaznaczając jedną z pralek."

export const PRALNIA_TASK_DEMO_F = "Wybierz najlepszą pralkę i kliknij na nią lewym przyciskiem myszy."
export const PRALNIA_TASK_DEMO_M = "Wybierz najlepszą pralkę i kliknij na nią lewym przyciskiem myszy."

export const RATING_TASK_TITLE_M = "Jesteśmy ciekawi na co zwróciłby Pan uwagę przy zakupie pralki.\nProsimy o ocenienie ważności właściwości pralek posługując się plusami. Proszę zaznaczyć wybraną liczbę plusów klikając na nie lewym przyciskiem myszy.\nIm większa liczba plusów, tym ważniejsza jest dla Pana dana właściwość. Może Pan przyznać tę samą liczbę plusów kilku właściwościom. Każda właściwość musi mieć co najmniej jeden plus i żadna właściwość nie może mieć więcej niż sześć plusów.\n Nie ma tu dobrych ani złych odpowiedzi, proszę się kierować własnymi preferencjami."
export const RATING_TASK_TITLE_F = "Jesteśmy ciekawi na co zwróciłaby Pani uwagę przy zakupie pralki.\nProsimy o ocenienie ważności właściwości pralek posługując się plusami. Proszę zaznaczyć wybraną liczbę plusów klikając na nie lewym przyciskiem myszy.\nIm większa liczba plusów, tym ważniejsza jest dla Pani dana właściwość. Może Pani przyznać tę samą liczbę plusów kilku właściwościom. Każda właściwość musi mieć co najmniej jeden plus i żadna właściwość nie może mieć więcej niż sześć plusów.\n Nie ma tu dobrych ani złych odpowiedzi, proszę się kierować własnymi preferencjami."

export const BRAND_TASK_TITLE_F = "Które z wymienionych poniżej marek bierze Pani pod uwagę kupując pralkę?"
export const BRAND_TASK_TITLE_M = "Które z wymienionych poniżej marek bierze Pan pod uwagę kupując pralkę?"

export const INPUT_TASK_TITLE_F = "Wyobraź sobie, że planujesz kupić pralkę. Wchodzić na stronę internetową sklepu z AGD i przeglądasz modele pralek. Ile modeli pralek obejrzysz przed dokonaniem wyboru?"
export const INPUT_TASK_TITLE_M = "Wyobraź sobie, że planujesz kupić pralkę. Wchodzić na stronę internetową sklepu z AGD i przeglądasz modele pralek. Ile modeli pralek obejrzysz przed dokonaniem wyboru?"

export const PREFERENCE_TASK_TITLE_F = "Dodatkowo prosimy o wskazanie akceptowalnego poziomu każdej właściwości pralki, którą kupowałaby Pani dla siebie.\n Przy każdej właściwości prosimy o wybranie wartości, którą uznałaby Pani za wystarczającą przy zakupie nowej pralki."
export const PREFERENCE_TASK_TITLE_M = "Dodatkowo prosimy o wskazanie akceptowalnego poziomu każdej właściwości pralki, którą kupowałby Pan dla siebie.\n Przy każdej właściwości prosimy o wybranie wartości, którą uznałby Pan za wystarczającą przy zakupie nowej pralki."

export const RATING_PREFERENCE_TASK_TITLE_F = "Jesteśmy ciekawi na co zwróciłaby Pani uwagę przy zakupie telefonu komórkowego.\n Prosimy o ocenienie ważności właściwości telefonów komórkowych posługując się plusami. Im większa liczba plusów, tym ważniejsza jest dla Pani dana właściwość. Może Pani przyznać tę samą liczbę plusów kilku właściwościom. Każda właściwość musi mieć co najmniej jeden plus i żadna właściwość nie może mieć więcej niż sześć plusów.\n Nie ma tu dobrych ani złych odpowiedzi, proszę się kierować własnymi preferencjami."
export const RATING_PREFERENCE_TASK_TITLE_M = "Jesteśmy ciekawi na co zwróciłby Pan uwagę przy zakupie telefonu komórkowego.\n Prosimy o ocenienie ważności właściwości telefonów komórkowych posługując się plusami. Im większa liczba plusów, tym ważniejsza jest dla Pana dana właściwość. Może Pan przyznać tę samą liczbę plusów kilku właściwościom. Każda właściwość musi mieć co najmniej jeden plus i żadna właściwość nie może mieć więcej niż sześć plusów.\n Nie ma tu dobrych ani złych odpowiedzi, proszę się kierować własnymi preferencjami."


