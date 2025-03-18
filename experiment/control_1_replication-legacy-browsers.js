/****************************** 
 * Control_1_Replication Test *
 ******************************/


// store info about the experiment session:
let expName = 'control_1_replication';  // from the Builder filename that created this script
let expInfo = {'participant': '', 'id': ''};

// Start code blocks for 'Before Experiment'

function randomsample(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}



ecdfArray = function(data) {

    "use strict";

    var f, sorted, xs, ps, i, j, l, xx;

    if (Array.isArray(data) && (data.length > 0)) {

      for (i = 0, l = data.length; i < l; ++i) {

        if (typeof(data[i]) !== 'number') {

          throw new TypeError("cdf data must be an array of finite numbers, got:" + typeof(data[i]) + " at " + i);

        }

        if (!isFinite(data[i])) {

          throw new TypeError("cdf data must be an array of finite numbers, got:" + data[i] + " at " + i);

        }

      }

      sorted = data.slice().sort(function(a, b) {

        return +a - b;

      });

      xs = [];

      ps = [];

      j = 0;

      l = sorted.length;

      xs[0] = sorted[0];

      ps[0] = 1 / l;

      for (i = 1; i < l; ++i) {

        xx = sorted[i];

        if (xx === xs[j]) {

          ps[j] = (1 + i) / l;

        } else {

          j++;

          xs[j] = xx;

          ps[j] = (1 + i) / l;

        }

      }

      f = function(x) {

        if (typeof(x) !== 'number') throw new TypeError('cdf function input must be a number, got:' + typeof(x));

        if (Number.isNaN(x)) return Number.NaN;

        var left = 0,

          right = xs.length - 1,

          mid, midval, iteration;

        if (x < xs[0]) return 0;

        if (x >= xs[xs.length - 1]) return 1;

        iteration = 0;

        while ((right - left) > 1) {

          mid = Math.floor((left + right) / 2);

          midval = xs[mid];

          if (x > midval)

            left = mid;

          else if (x < midval)

            right = mid;

          else if (x === midval) {

            left = mid;

            right = mid;

          }

          ++iteration;

          if (iteration>40) throw new Error("cdf function exceeded 40 bisection iterations, aborting bisection loop");

        }

        return ps[left];

      };

      f.xs = function() {

        return xs;

      };

      f.ps = function() {

        return ps;

      };

    } else {

      // missing or zero length data

      throw new TypeError("cdf data must be an array of finite numbers, got: missing or empty array");

    }

    return f;

  };
// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([1.0, 1.0, 1.0]),
  units: 'height',
  waitBlanking: true
});
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(init_codeRoutineBegin());
flowScheduler.add(init_codeRoutineEachFrame());
flowScheduler.add(init_codeRoutineEnd());
const consent_loopLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(consent_loopLoopBegin(consent_loopLoopScheduler));
flowScheduler.add(consent_loopLoopScheduler);
flowScheduler.add(consent_loopLoopEnd);
const loop1LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(loop1LoopBegin(loop1LoopScheduler));
flowScheduler.add(loop1LoopScheduler);
flowScheduler.add(loop1LoopEnd);
const loop2LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(loop2LoopBegin(loop2LoopScheduler));
flowScheduler.add(loop2LoopScheduler);
flowScheduler.add(loop2LoopEnd);
const walk_examplesLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(walk_examplesLoopBegin(walk_examplesLoopScheduler));
flowScheduler.add(walk_examplesLoopScheduler);
flowScheduler.add(walk_examplesLoopEnd);
const loop3LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(loop3LoopBegin(loop3LoopScheduler));
flowScheduler.add(loop3LoopScheduler);
flowScheduler.add(loop3LoopEnd);
const see_actionsLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(see_actionsLoopBegin(see_actionsLoopScheduler));
flowScheduler.add(see_actionsLoopScheduler);
flowScheduler.add(see_actionsLoopEnd);
const loop4LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(loop4LoopBegin(loop4LoopScheduler));
flowScheduler.add(loop4LoopScheduler);
flowScheduler.add(loop4LoopEnd);
const miss_ride_sometimesLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(miss_ride_sometimesLoopBegin(miss_ride_sometimesLoopScheduler));
flowScheduler.add(miss_ride_sometimesLoopScheduler);
flowScheduler.add(miss_ride_sometimesLoopEnd);
const loop5LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(loop5LoopBegin(loop5LoopScheduler));
flowScheduler.add(loop5LoopScheduler);
flowScheduler.add(loop5LoopEnd);
const couple_of_examplesLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(couple_of_examplesLoopBegin(couple_of_examplesLoopScheduler));
flowScheduler.add(couple_of_examplesLoopScheduler);
flowScheduler.add(couple_of_examplesLoopEnd);
const loop6LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(loop6LoopBegin(loop6LoopScheduler));
flowScheduler.add(loop6LoopScheduler);
flowScheduler.add(loop6LoopEnd);
const platform_examplesLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(platform_examplesLoopBegin(platform_examplesLoopScheduler));
flowScheduler.add(platform_examplesLoopScheduler);
flowScheduler.add(platform_examplesLoopEnd);
const loop7LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(loop7LoopBegin(loop7LoopScheduler));
flowScheduler.add(loop7LoopScheduler);
flowScheduler.add(loop7LoopEnd);
const trials_reviewLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trials_reviewLoopBegin(trials_reviewLoopScheduler));
flowScheduler.add(trials_reviewLoopScheduler);
flowScheduler.add(trials_reviewLoopEnd);
flowScheduler.add(let_the_game_beginRoutineBegin());
flowScheduler.add(let_the_game_beginRoutineEachFrame());
flowScheduler.add(let_the_game_beginRoutineEnd());
const blockLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(blockLoopBegin(blockLoopScheduler));
flowScheduler.add(blockLoopScheduler);
flowScheduler.add(blockLoopEnd);
const trials_2LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trials_2LoopBegin(trials_2LoopScheduler));
flowScheduler.add(trials_2LoopScheduler);
flowScheduler.add(trials_2LoopEnd);
const need_feedbackLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(need_feedbackLoopBegin(need_feedbackLoopScheduler));
flowScheduler.add(need_feedbackLoopScheduler);
flowScheduler.add(need_feedbackLoopEnd);
flowScheduler.add(end_experimentRoutineBegin());
flowScheduler.add(end_experimentRoutineEachFrame());
flowScheduler.add(end_experimentRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    {'name': 'instr_new_draft/Slide11.jpeg', 'path': 'instr_new_draft/Slide11.jpeg'},
    {'name': 'instr_new_draft/Slide12.jpeg', 'path': 'instr_new_draft/Slide12.jpeg'},
    {'name': 'instr_new_draft/Slide7.jpeg', 'path': 'instr_new_draft/Slide7.jpeg'},
    {'name': 'instr_new_draft/Slide18.jpeg', 'path': 'instr_new_draft/Slide18.jpeg'},
    {'name': 'instr_new_draft/Slide54.jpeg', 'path': 'instr_new_draft/Slide54.jpeg'},
    {'name': 'opt_inr.jpg', 'path': 'opt_inr.jpg'},
    {'name': 'instr_new_draft/Slide33.jpeg', 'path': 'instr_new_draft/Slide33.jpeg'},
    {'name': 'planes/walking.png', 'path': 'planes/walking.png'},
    {'name': 'instr_new_draft/Slide13.jpeg', 'path': 'instr_new_draft/Slide13.jpeg'},
    {'name': 'instr_new_draft/Slide16.jpeg', 'path': 'instr_new_draft/Slide16.jpeg'},
    {'name': 'instr_new_draft/Slide55.jpeg', 'path': 'instr_new_draft/Slide55.jpeg'},
    {'name': 'instr_new_draft/Slide37.jpeg', 'path': 'instr_new_draft/Slide37.jpeg'},
    {'name': 'instr_new_draft/Slide39.jpeg', 'path': 'instr_new_draft/Slide39.jpeg'},
    {'name': 'instr_new_draft/Slide41.jpeg', 'path': 'instr_new_draft/Slide41.jpeg'},
    {'name': 'instr_new_draft/Slide2.jpeg', 'path': 'instr_new_draft/Slide2.jpeg'},
    {'name': 'instr_new_draft/Slide56.jpeg', 'path': 'instr_new_draft/Slide56.jpeg'},
    {'name': 'instr_new_draft/Slide23.jpeg', 'path': 'instr_new_draft/Slide23.jpeg'},
    {'name': 'instr_new_draft/Slide53.jpeg', 'path': 'instr_new_draft/Slide53.jpeg'},
    {'name': 'instr_new_draft/Slide48.jpeg', 'path': 'instr_new_draft/Slide48.jpeg'},
    {'name': 'Slide1.jpeg', 'path': 'Slide1.jpeg'},
    {'name': 'risk_distributions_final/Slide2.jpeg', 'path': 'risk_distributions_final/Slide2.jpeg'},
    {'name': 'instr_new_draft/Slide46.jpeg', 'path': 'instr_new_draft/Slide46.jpeg'},
    {'name': 'instr_new_draft/Slide58.jpeg', 'path': 'instr_new_draft/Slide58.jpeg'},
    {'name': 'attempt_bo.jpg', 'path': 'attempt_bo.jpg'},
    {'name': 'risk_distributions_final/Slide5.jpeg', 'path': 'risk_distributions_final/Slide5.jpeg'},
    {'name': 'risk_distributions_final/Slide1.jpeg', 'path': 'risk_distributions_final/Slide1.jpeg'},
    {'name': 'planes/plane.png', 'path': 'planes/plane.png'},
    {'name': 'planes/full_down_arrow.png', 'path': 'planes/full_down_arrow.png'},
    {'name': 'risk_distributions_final/Slide13.jpeg', 'path': 'risk_distributions_final/Slide13.jpeg'},
    {'name': 'distinguiish_actions/Slide2.jpeg', 'path': 'distinguiish_actions/Slide2.jpeg'},
    {'name': 'instr_new_draft/Slide43.jpeg', 'path': 'instr_new_draft/Slide43.jpeg'},
    {'name': 'risk_distributions_final/Slide15.jpeg', 'path': 'risk_distributions_final/Slide15.jpeg'},
    {'name': 'risk_distributions_final/Slide7.jpeg', 'path': 'risk_distributions_final/Slide7.jpeg'},
    {'name': 'instr_new_draft/Slide19.jpeg', 'path': 'instr_new_draft/Slide19.jpeg'},
    {'name': 'risk_distributions_final/Slide11.jpeg', 'path': 'risk_distributions_final/Slide11.jpeg'},
    {'name': 'instr_new_draft/Slide35.jpeg', 'path': 'instr_new_draft/Slide35.jpeg'},
    {'name': 'risk_distributions_final/Slide12.jpeg', 'path': 'risk_distributions_final/Slide12.jpeg'},
    {'name': 'instr_new_draft/Slide59.jpeg', 'path': 'instr_new_draft/Slide59.jpeg'},
    {'name': 'tic.jpg', 'path': 'tic.jpg'},
    {'name': 'gamble.png', 'path': 'gamble.png'},
    {'name': 'islands/town.png', 'path': 'islands/town.png'},
    {'name': 'subject_breakdown.csv', 'path': 'subject_breakdown.csv'},
    {'name': 'instr_new_draft/Slide22.jpeg', 'path': 'instr_new_draft/Slide22.jpeg'},
    {'name': 'planes/pointer.png', 'path': 'planes/pointer.png'},
    {'name': 'risk_distributions_final/Slide8.jpeg', 'path': 'risk_distributions_final/Slide8.jpeg'},
    {'name': 'instr_new_draft/Slide51.jpeg', 'path': 'instr_new_draft/Slide51.jpeg'},
    {'name': 'instr_new_draft/Slide36.jpeg', 'path': 'instr_new_draft/Slide36.jpeg'},
    {'name': 'risk_distributions_final/Slide9.jpeg', 'path': 'risk_distributions_final/Slide9.jpeg'},
    {'name': 'practice_one_ticket.jpg', 'path': 'practice_one_ticket.jpg'},
    {'name': 'planes/left_diag.png', 'path': 'planes/left_diag.png'},
    {'name': 'instr_new_draft/Slide25.jpeg', 'path': 'instr_new_draft/Slide25.jpeg'},
    {'name': 'instr_new_draft/Slide49.jpeg', 'path': 'instr_new_draft/Slide49.jpeg'},
    {'name': 'planes/right_arrow.png', 'path': 'planes/right_arrow.png'},
    {'name': 'instr_new_draft/Slide42.jpeg', 'path': 'instr_new_draft/Slide42.jpeg'},
    {'name': 'instr_new_draft/Slide38.jpeg', 'path': 'instr_new_draft/Slide38.jpeg'},
    {'name': 'planes/down_arrow.png', 'path': 'planes/down_arrow.png'},
    {'name': 'islands/win.png', 'path': 'islands/win.png'},
    {'name': 'risk_distributions_final/Slide6.jpeg', 'path': 'risk_distributions_final/Slide6.jpeg'},
    {'name': 'risk_distributions_final/Slide3.jpeg', 'path': 'risk_distributions_final/Slide3.jpeg'},
    {'name': 'instr_new_draft/Slide31.jpeg', 'path': 'instr_new_draft/Slide31.jpeg'},
    {'name': 'planes/new_platform.png', 'path': 'planes/new_platform.png'},
    {'name': 'planes/space_ship.png', 'path': 'planes/space_ship.png'},
    {'name': 'instr_new_draft/Slide29.jpeg', 'path': 'instr_new_draft/Slide29.jpeg'},
    {'name': 'instr_new_draft/Slide1.jpeg', 'path': 'instr_new_draft/Slide1.jpeg'},
    {'name': 'instr_new_draft/Slide5.jpeg', 'path': 'instr_new_draft/Slide5.jpeg'},
    {'name': 'instr_new_draft/Slide20.jpeg', 'path': 'instr_new_draft/Slide20.jpeg'},
    {'name': 'instr_new_draft/Slide50.jpeg', 'path': 'instr_new_draft/Slide50.jpeg'},
    {'name': 'instr_new_draft/Slide32.jpeg', 'path': 'instr_new_draft/Slide32.jpeg'},
    {'name': 'instr_new_draft/Slide4.jpeg', 'path': 'instr_new_draft/Slide4.jpeg'},
    {'name': 'instr_new_draft/Slide30.jpeg', 'path': 'instr_new_draft/Slide30.jpeg'},
    {'name': 'instr_new_draft/Slide6.jpeg', 'path': 'instr_new_draft/Slide6.jpeg'},
    {'name': 'islands/hut.png', 'path': 'islands/hut.png'},
    {'name': 'instr_new_draft/Slide26.jpeg', 'path': 'instr_new_draft/Slide26.jpeg'},
    {'name': 'distinguiish_actions/Slide3.jpeg', 'path': 'distinguiish_actions/Slide3.jpeg'},
    {'name': 'islands/mountain.png', 'path': 'islands/mountain.png'},
    {'name': 'instr_new_draft/Slide21.jpeg', 'path': 'instr_new_draft/Slide21.jpeg'},
    {'name': 'instr_new_draft/Slide17.jpeg', 'path': 'instr_new_draft/Slide17.jpeg'},
    {'name': 'planes/train.png', 'path': 'planes/train.png'},
    {'name': 'instr_new_draft/Slide45.jpeg', 'path': 'instr_new_draft/Slide45.jpeg'},
    {'name': 'instr_new_draft/Slide44.jpeg', 'path': 'instr_new_draft/Slide44.jpeg'},
    {'name': 'instr_new_draft/Slide27.jpeg', 'path': 'instr_new_draft/Slide27.jpeg'},
    {'name': 'instr_new_draft/Slide15.jpeg', 'path': 'instr_new_draft/Slide15.jpeg'},
    {'name': 'risk_distributions_final/Slide14.jpeg', 'path': 'risk_distributions_final/Slide14.jpeg'},
    {'name': 'instr_new_draft/Slide24.jpeg', 'path': 'instr_new_draft/Slide24.jpeg'},
    {'name': 'instr_new_draft/Slide8.jpeg', 'path': 'instr_new_draft/Slide8.jpeg'},
    {'name': 'risk_distributions_final/Slide10.jpeg', 'path': 'risk_distributions_final/Slide10.jpeg'},
    {'name': 'instr_new_draft/Slide47.jpeg', 'path': 'instr_new_draft/Slide47.jpeg'},
    {'name': 'instr_new_draft/Slide40.jpeg', 'path': 'instr_new_draft/Slide40.jpeg'},
    {'name': 'instr_new_draft/Slide9.jpeg', 'path': 'instr_new_draft/Slide9.jpeg'},
    {'name': 'instr_new_draft/Slide52.jpeg', 'path': 'instr_new_draft/Slide52.jpeg'},
    {'name': 'transport_rules/Slide1.jpeg', 'path': 'transport_rules/Slide1.jpeg'},
    {'name': 'risk_distributions_final/Slide4.jpeg', 'path': 'risk_distributions_final/Slide4.jpeg'},
    {'name': 'instr_new_draft/Slide3.jpeg', 'path': 'instr_new_draft/Slide3.jpeg'},
    {'name': 'planes/right_diag.png', 'path': 'planes/right_diag.png'},
    {'name': 'islands/desert.png', 'path': 'islands/desert.png'},
    {'name': 'instr_new_draft/Slide28.jpeg', 'path': 'instr_new_draft/Slide28.jpeg'},
    {'name': 'distinguiish_actions/Slide1.jpeg', 'path': 'distinguiish_actions/Slide1.jpeg'},
    {'name': 'instr_new_draft/Slide10.jpeg', 'path': 'instr_new_draft/Slide10.jpeg'},
    {'name': 'instr_new_draft/Slide14.jpeg', 'path': 'instr_new_draft/Slide14.jpeg'},
    {'name': 'instr_new_draft/Slide57.jpeg', 'path': 'instr_new_draft/Slide57.jpeg'},
    {'name': 'instr_new_draft/Slide34.jpeg', 'path': 'instr_new_draft/Slide34.jpeg'}
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);


var frameDur;
async function updateInfo() {
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2022.1.4';
  expInfo['OS'] = window.navigator.platform;

  psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}`);

  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  psychoJS.setRedirectUrls(((('https://hujipsych.au1.qualtrics.com/jfe/form/SV_9vNlj3F6NhXG2QS?participant=' + expInfo['participant']) + '&id=') + expInfo['id']), ((('https://hujipsych.au1.qualtrics.com/jfe/form/SV_6YeeZkt5hM08j9Y?participant=' + expInfo['participant']) + '&id=') + expInfo['id']));

  return Scheduler.Event.NEXT;
}


var init_codeClock;
var thisExp;
var win;
var event;
var shuffle;
var random;
var randint;
var range;
var ecdfArray;
var cor_test_real;
var num_consecutive_correct;
var num_ss_correct;
var island_b0;
var island_b1;
var islands_start;
var island_0;
var island_1;
var islands;
var plane;
var train;
var transport;
var switch_i;
var state_transitions;
var switch_t;
var action_transitions;
var total_earned;
var get_times;
var corr_total;
var soon_hard;
var reivew;
var corr_total_strict;
var corr_total_rebuy;
var time_for_hard_officer;
var performance_arr;
var consent_form_1Clock;
var consent;
var key_resp_11;
var text_9;
var text_12;
var consent_form_2Clock;
var text_24;
var key_resp_14;
var consent_form_3Clock;
var text_25;
var key_resp_17;
var consent_form_4Clock;
var text_22;
var key_resp_12;
var consent_5Clock;
var text_23;
var key_resp_19;
var review_routesClock;
var set_of_instructions;
var slide_review;
var quiz_set;
var before_task;
var in_task;
var key_resp_first_3;
var image_6;
var quizClock;
var move_on_hard_officer;
var rebuy_please;
var cor_first;
var times_quiz_wrong;
var num_wrong;
var test_q;
var quiz_answer;
var warnin;
var make_fake_choiceClock;
var dep_island_6;
var key_resp_1;
var explain_2;
var show_fake_choiceClock;
var walking_2;
var dep_island_7;
var feeedbackssClock;
var departure_state_3;
var final_state_3;
var text;
var next_trial_2;
var walking_3;
var new_examplesClock;
var text_5;
var key_resp_3;
var opt_in_choice_2Clock;
var dep_island_22;
var key_resp_15;
var text_2;
var make_choice_2Clock;
var last_time;
var last_beg;
var press1;
var left_choice_5;
var right_choice_5;
var destination_island_5;
var key_resp_8;
var dep_island_23;
var press9_2;
var show_choice_2Clock;
var right_choice_6;
var walking_4;
var dep_island_24;
var final_state_supposed_to_3;
var inteded_location_4;
var left_choice_6;
var feeedback__2Clock;
var miss_sometimes;
var tran_selected_3;
var text_21;
var next_trial_3;
var walking_6;
var dep_island_26;
var final_state_4;
var final_state_supposed_to_2;
var counter;
var inteded_location_3;
var action_prepClock;
var set_actions;
var warning;
var ready;
var action_executionClock;
var yScale;
var minSize;
var maxSize;
var pathStart;
var pathN;
var xScale;
var posClock;
var sizeClock;
var current_pos;
var moving_cue_9;
var action;
var feedbackClock;
var hard;
var gor;
var text_3;
var key_resp_18;
var text_26;
var open_questionsClock;
var textbox;
var text_7;
var mouse;
var text_8;
var please_write_more;
var let_the_game_beginClock;
var text_6;
var key_resp_4;
var init_blockClock;
var polygon_2;
var practice_in_taskClock;
var start_with;
var image_7;
var key_resp_first;
var check_action_understandingClock;
var test_q_2;
var test_action_answer;
var new_platform_5;
var answer_2;
var traveling_to_new_planetClock;
var background_color_2;
var traveling_one;
var space_ship;
var one_or_three_2Clock;
var polygon_23;
var key_resp_9;
var text_32;
var opt_in_choice_3Clock;
var la_opt_in;
var feat_lr;
var background_color_4;
var dep_island_5;
var comp_choose;
var here;
var origin_pointer;
var cur_winnings_3;
var planet_number_5;
var total_opt_timedOut;
var occluded_treasure_2;
var text_30;
var opt_in;
var image_2;
var timedOut_LostClock;
var polygon_16;
var text_29;
var make_choiceClock;
var polygon_5;
var press1_2;
var dep_island;
var left_choice;
var right_choice;
var destination_island;
var key_resp_2;
var cur_winnings;
var press9;
var planet_number_4;
var image;
var text_14;
var show_choiceClock;
var polygon_6;
var dep_island_3;
var right_choice_3;
var destination_island_3;
var left_choice_3;
var treasure;
var planet_number_2;
var key_resp_6;
var buy_Second_ticket;
var action_distinction;
var ok_wait_2Clock;
var polygon_3;
var Computer_Selects_3;
var departure_state_5;
var planet_number_3;
var eight;
var tran_selected_2;
var walk;
var action_prep_2Clock;
var polygon_7;
var warning_2;
var ready_2;
var new_platform;
var action_execClock;
var polygon_9;
var action_2;
var cue_object_2;
var moving_cue_7;
var timer_text;
var try_again_2Clock;
var dont_check_again;
var wself2;
var wself3;
var rp;
var polygon_10;
var choose_again_2;
var key_try_again_2;
var new_platform_3;
var text_4;
var ok_waitClock;
var polygon;
var Computer_Selects;
var final_state_supposed_to_5;
var inteded_location_5;
var text_timer2_2;
var departure_state_4;
var timedOUTClock;
var polygon_4;
var text_28;
var feedback_2Clock;
var determined_already;
var success;
var polygon_11;
var session1;
var tracking_success;
var departure_state;
var final_state;
var specify_reward;
var tran_selected;
var final_state_supposed_to;
var inteded_location;
var text_17;
var image_8;
var key_resp_13;
var selected_transport;
var walking;
var new_platform_4;
var selected_transport_3;
var specify_reward_2;
var action_reminder;
var excitedClock;
var trials_last_query_e;
var opt_out_won_e;
var opt_out_lost_e;
var opt_in_lost_high_e;
var opt_in_lost_e;
var opt_in_won_e;
var trials_last_query_s;
var polygon_18;
var excited_query;
var excited_title;
var slider_excited;
var contentClock;
var trials_last_query;
var trials_last_query_t;
var opt_out_won;
var opt_out_lost;
var opt_in_lost_high;
var opt_in_lost;
var opt_in_won;
var polygon_19;
var content_query_2;
var content_title;
var slider_7;
var num_tickets_queryClock;
var polygon_24;
var ticket_officer_query_3;
var slider_3;
var breather_2Clock;
var text_16;
var key_resp_10;
var risk_choices_2Clock;
var coins;
var win_prob;
var varie_size;
var varie_position;
var test_q_6;
var answer;
var image_9;
var text_31;
var key_resp_16;
var gamblingoutcomeClock;
var background_color_3;
var traveling_one_2;
var space_ship_2;
var gamble_outcomeClock;
var text_27;
var key_resp_20;
var open_questions_2Clock;
var textbox_2;
var text_18;
var mouse_2;
var text_19;
var please_write_more_2;
var end_experimentClock;
var text_13;
var key_resp_7;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "init_code"
  init_codeClock = new util.Clock();
  
  //document.body.style.cursor='none';
  thisExp=psychoJS.experiment;
  win=psychoJS.window;
  event=psychoJS.eventManager;
  shuffle = util.shuffle;
  
  random = Math.random;
  randint = function(min, maxplusone) {
    return Math.floor(Math.random() * (maxplusone - min) ) + min;
  }
  range = function (size, startAt = 0) {
      return [...Array(size).keys()].map(i => i + startAt);
  }
  
  
  function randomsample(arr, size) {
      var shuffled = arr.slice(0), i = arr.length, min = i - size, temp, index;
      while (i-- > min) {
          index = Math.floor((i + 1) * Math.random());
          temp = shuffled[index];
          shuffled[index] = shuffled[i];
          shuffled[i] = temp;
      }
      return shuffled.slice(min);
  }
  
  
  ecdfArray = function(data) {
  
      "use strict";
  
      var f, sorted, xs, ps, i, j, l, xx;
  
      if (Array.isArray(data) && (data.length > 0)) {
  
        for (i = 0, l = data.length; i < l; ++i) {
  
          if (typeof(data[i]) !== 'number') {
  
            throw new TypeError("cdf data must be an array of finite numbers, got:" + typeof(data[i]) + " at " + i);
  
          }
  
          if (!isFinite(data[i])) {
  
            throw new TypeError("cdf data must be an array of finite numbers, got:" + data[i] + " at " + i);
  
          }
  
        }
  
        sorted = data.slice().sort(function(a, b) {
  
          return +a - b;
  
        });
  
        xs = [];
  
        ps = [];
  
        j = 0;
  
        l = sorted.length;
  
        xs[0] = sorted[0];
  
        ps[0] = 1 / l;
  
        for (i = 1; i < l; ++i) {
  
          xx = sorted[i];
  
          if (xx === xs[j]) {
  
            ps[j] = (1 + i) / l;
  
          } else {
  
            j++;
  
            xs[j] = xx;
  
            ps[j] = (1 + i) / l;
  
          }
  
        }
  
        f = function(x) {
  
          if (typeof(x) !== 'number') throw new TypeError('cdf function input must be a number, got:' + typeof(x));
  
          if (Number.isNaN(x)) return Number.NaN;
  
          var left = 0,
  
            right = xs.length - 1,
  
            mid, midval, iteration;
  
          if (x < xs[0]) return 0;
  
          if (x >= xs[xs.length - 1]) return 1;
  
          iteration = 0;
  
          while ((right - left) > 1) {
  
            mid = Math.floor((left + right) / 2);
  
            midval = xs[mid];
  
            if (x > midval)
  
              left = mid;
  
            else if (x < midval)
  
              right = mid;
  
            else if (x === midval) {
  
              left = mid;
  
              right = mid;
  
            }
  
            ++iteration;
  
            if (iteration>40) throw new Error("cdf function exceeded 40 bisection iterations, aborting bisection loop");
  
          }
  
          return ps[left];
  
        };
  
        f.xs = function() {
  
          return xs;
  
        };
  
        f.ps = function() {
  
          return ps;
  
        };
  
      } else {
  
        // missing or zero length data
  
        throw new TypeError("cdf data must be an array of finite numbers, got: missing or empty array");
  
      }
  
      return f;
  
    };
  
  
  cor_test_real = [];
  num_consecutive_correct = 0;
  num_ss_correct = 0;
  
  
  
  
  ecdfArray = function(data) {
  
      "use strict";
  
      var f, sorted, xs, ps, i, j, l, xx;
  
      if (Array.isArray(data) && (data.length > 0)) {
  
        for (i = 0, l = data.length; i < l; ++i) {
  
          if (typeof(data[i]) !== 'number') {
  
            throw new TypeError("cdf data must be an array of finite numbers, got:" + typeof(data[i]) + " at " + i);
  
          }
  
          if (!isFinite(data[i])) {
  
            throw new TypeError("cdf data must be an array of finite numbers, got:" + data[i] + " at " + i);
  
          }
  
        }
  
        sorted = data.slice().sort(function(a, b) {
  
          return +a - b;
  
        });
  
        xs = [];
  
        ps = [];
  
        j = 0;
  
        l = sorted.length;
  
        xs[0] = sorted[0];
  
        ps[0] = 1 / l;
  
        for (i = 1; i < l; ++i) {
  
          xx = sorted[i];
  
          if (xx === xs[j]) {
  
            ps[j] = (1 + i) / l;
  
          } else {
  
            j++;
  
            xs[j] = xx;
  
            ps[j] = (1 + i) / l;
  
          }
  
        }
  
        f = function(x) {
  
          if (typeof(x) !== 'number') throw new TypeError('cdf function input must be a number, got:' + typeof(x));
  
          if (Number.isNaN(x)) return Number.NaN;
  
          var left = 0,
  
            right = xs.length - 1,
  
            mid, midval, iteration;
  
          if (x < xs[0]) return 0;
  
          if (x >= xs[xs.length - 1]) return 1;
  
          iteration = 0;
  
          while ((right - left) > 1) {
  
            mid = Math.floor((left + right) / 2);
  
            midval = xs[mid];
  
            if (x > midval)
  
              left = mid;
  
            else if (x < midval)
  
              right = mid;
  
            else if (x === midval) {
  
              left = mid;
  
              right = mid;
  
            }
  
            ++iteration;
  
            if (iteration>40) throw new Error("cdf function exceeded 40 bisection iterations, aborting bisection loop");
  
          }
  
          return ps[left];
  
        };
  
        f.xs = function() {
  
          return xs;
  
        };
  
        f.ps = function() {
  
          return ps;
  
        };
  
      } else {
  
        // missing or zero length data
  
        throw new TypeError("cdf data must be an array of finite numbers, got: missing or empty array");
  
      }
  
      return f;
  
    };
  island_b0 = "islands/hut.png";
  island_b1 = "islands/desert.png";
  islands_start = [island_b0, island_b1];
  island_0 = "islands/mountain.png";
  island_1 = "islands/town.png";
  islands = [island_0, island_1];
  plane = "planes/plane.png";
  train = "planes/train.png";
  transport = [plane, train];
  switch_i = randint(0, 1);
  if ((switch_i === 0)) {
      state_transitions = {[islands_start[0]]: islands[0], [islands_start[1]]: islands[1]};
  } else {
      state_transitions = {[islands_start[1]]: islands[0], [islands_start[0]]: islands[1]};
  }
  switch_t = randint(0, 1);
  if ((switch_i === 0)) {
      action_transitions = {[plane]: islands[0], [train]: islands[1]};
  } else {
      action_transitions = {[train]: islands[0], [plane]: islands[1]};
  }
  total_earned = 0;
  cor_test_real = [];
  
  
  var todays= new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  psychoJS.experiment.addData("experiment_started", todays);
  
  cor_test_real=[];
  get_times=[0]*20;
  corr_total=[];
  soon_hard=0;
  reivew=0; 
  corr_total_strict=[];
  corr_total_rebuy=[];
  time_for_hard_officer=false;
  performance_arr=[];
  function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }
  
  function logisticRegression(features, labels, numIterations, learningRate) {
    const m = features.length;
    const n = features[0].length;
    let weights = new Array(n + 1).fill(0);
  
    for (let i = 0; i < numIterations; i++) {
      for (let j = 0; j < m; j++) {
        let prediction = sigmoid(dotProduct(weights, [1, ...features[j]]));
        let error = prediction - labels[j];
        for (let k = 0; k < n + 1; k++) {
          weights[k] = weights[k] - learningRate * error * ([1, ...features[j]][k]);
        }
      }
    }
  
    return weights;
  }
  
  function dotProduct(a, b) {
    return a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);
  }
  // Initialize components for Routine "consent_form_1"
  consent_form_1Clock = new util.Clock();
  consent = new visual.TextStim({
    win: psychoJS.window,
    name: 'consent',
    text: '',
    font: 'Open Sans',
    units: 'norm', 
    pos: [(- 0.5), 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -1.0 
  });
  
  key_resp_11 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  text_9 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_9',
    text: '',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0, 0.25], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([0.0824, (- 0.6627), 0.7725]),  opacity: undefined,
    depth: -3.0 
  });
  
  text_12 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_12',
    text: '',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0, (- 0.25)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 0.0039), 1.0, (- 1.0)]),  opacity: undefined,
    depth: -4.0 
  });
  
  // Initialize components for Routine "consent_form_2"
  consent_form_2Clock = new util.Clock();
  text_24 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_24',
    text: 'What will happen to me if I take part?\n\n\nYou will play an intergalactic game in which you will try to find treasures on various planets. You will learn what methods of transportation take you where, when to buy tickets, how to catch a moving train and how to avoid bandits from stealing your money. The game will take about an hour. You will be paid 10 dollars for completing the study, and you can earn up to an additional 5 dollars depending on your performance in the game. Credit for your participation will be provided by Prolific Academic.\n\nWhat are the possible disadvantages and risks of taking part?\n\nThe game you will play does not pose any known risks or disadvantages. In the surveys, you will be asked to answer some questions about yourself. Please feel free to contact us in case of any distress as a result of this study (contact details are provided below). Note that you are not obligated to participate in this study, and you may terminate your participation at any point during the study. \n\nPress Space to continue',
    font: 'Open Sans',
    units: 'norm', 
    pos: [(- 0.5), 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -1.0 
  });
  
  key_resp_14 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "consent_form_3"
  consent_form_3Clock = new util.Clock();
  text_25 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_25',
    text: 'What are the possible benefits of taking part?\n\nWhile there are no immediate benefits to taking part, except from credit given for your participation, this research will help us understand better how differences in learning and decision making might contribute to clinical psychological disorders.\n\n\nWhat do I have to pay attention to while participating?\n\n\nThe researcher reserves the right not to pay if it is clear that you have completed the task or surveys randomly, without paying attention, or with negligence. Paying attention and following the instructions will ensure that you will be paid the full amount. We use a variety of explicit and concealed measures to verify sincerity and a lack of negligence in task performance.\n\nPlease refrain from doing other things (e.g. other experiments, other online or offline activities) until the end of the experiment. \n\n\nPlease do not proceed with this study if you are not a fluent English speaker. \n\nPress Space to continue\n\n',
    font: 'Open Sans',
    units: 'norm', 
    pos: [(- 0.5), 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -1.0 
  });
  
  key_resp_17 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "consent_form_4"
  consent_form_4Clock = new util.Clock();
  text_22 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_22',
    text: 'What about my data?\n\nWe collect behavioral and self-reported data in this study. The data will be anonymized, and your User ID will be replaced with a non-identifiable random ID number. Some of this data might be shared in publications, public data sets or scientific reports, again without any means of identification. \n\nQueries and complaints\n\nIf you have any questions, concerns or complaints regarding this study please contact the researchers: Levi Solomyak and Aviv Emanuel - levi.solomyak@mail.huji.ac.il, aviv.emanuel@mail.huji.ac.il\n\n\n\n \n\nI certify that I have read the informed consent and received the information to contact the investigators if necessary.\n\n --- for yes press Y\n --- for no  press N\n\nI certify that I am a fluent in English.\n\n --- for yes press Y\n --- for no  press N',
    font: 'Open Sans',
    units: 'norm', 
    pos: [(- 0.5), 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -1.0 
  });
  
  key_resp_12 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "consent_5"
  consent_5Clock = new util.Clock();
  text_23 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_23',
    text: '',
    font: 'Open Sans',
    units: 'norm', 
    pos: [(- 0.5), 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -2.0 
  });
  
  key_resp_19 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "review_routes"
  review_routesClock = new util.Clock();
  set_of_instructions = 1;
  slide_review = 1;
  quiz_set = 1;
  set_of_instructions = 1;
  before_task = true;
  in_task = false;
  
  key_resp_first_3 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  image_6 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'image_6', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [1.69, 1],
    color : new util.Color([(- 1.0), (- 1.0), (- 1.0)]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  // Initialize components for Routine "quiz"
  quizClock = new util.Clock();
  move_on_hard_officer = false;
  rebuy_please = false;
  cor_first = 0;
  times_quiz_wrong = 0;
  num_wrong = 0;
  
  test_q = new visual.TextStim({
    win: psychoJS.window,
    name: 'test_q',
    text: '',
    font: 'arial',
    units: 'norm', 
    pos: [(- 0.3), 0], height: 0.075,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -1.0 
  });
  
  quiz_answer = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  warnin = new visual.TextStim({
    win: psychoJS.window,
    name: 'warnin',
    text: '',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0, (- 0.6)], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -3.0 
  });
  
  // Initialize components for Routine "make_fake_choice"
  make_fake_choiceClock = new util.Clock();
  dep_island_6 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'dep_island_6', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.75], size : [0.33, 0.66],
    color : new util.Color([1.0, 1.0, 1.0]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  key_resp_1 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  explain_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'explain_2',
    text: "Let's see an example of what it looks like to walk! \n\nPress space to see where you walk to.\n",
    font: 'Open Sans',
    units: 'norm', 
    pos: [0, 0], height: 0.075,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -3.0 
  });
  
  // Initialize components for Routine "show_fake_choice"
  show_fake_choiceClock = new util.Clock();
  walking_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'walking_2', units : undefined, 
    image : 'planes/walking.png', mask : undefined,
    ori : 0.0, pos : [0, 0.1], size : [0.24, 0.24],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  dep_island_7 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'dep_island_7', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.75], size : [0.33, 0.66],
    color : new util.Color([1.0, 1.0, 1.0]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  // Initialize components for Routine "feeedbackss"
  feeedbackssClock = new util.Clock();
  departure_state_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'departure_state_3', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.75], size : [0.33, 0.66],
    color : new util.Color([1.0, 1.0, 1.0]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  final_state_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'final_state_3', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, (- 0.66)], size : [0.33, 0.66],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  text = new visual.TextStim({
    win: psychoJS.window,
    name: 'text',
    text: 'Press space to continue ',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0, (- 0.3)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -3.0 
  });
  
  next_trial_2 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  walking_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'walking_3', units : undefined, 
    image : 'planes/walking.png', mask : undefined,
    ori : 0.0, pos : [0, 0.1], size : [0.24, 0.24],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  // Initialize components for Routine "new_examples"
  new_examplesClock = new util.Clock();
  text_5 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_5',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.3), 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -1.0 
  });
  
  key_resp_3 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "opt_in_choice_2"
  opt_in_choice_2Clock = new util.Clock();
  dep_island_22 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'dep_island_22', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.75], size : [0.33, 0.66],
    color : new util.Color([0.0, 0.0, 0.0]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  key_resp_15 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  text_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_2',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.3), 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -5.0 
  });
  
  // Initialize components for Routine "make_choice_2"
  make_choice_2Clock = new util.Clock();
  last_time=[]; 
  last_beg=0;
  press1 = new visual.TextStim({
    win: psychoJS.window,
    name: 'press1',
    text: 'Press 1 ',
    font: 'arial',
    units: 'norm', 
    pos: [(- 0.25), (- 0.05)], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -1.0 
  });
  
  left_choice_5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'left_choice_5', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.25), 0.25], size : [0.24, 0.48],
    color : new util.Color([0.9216, 0.9216, 0.9216]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  right_choice_5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'right_choice_5', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0.25, 0.25], size : [0.24, 0.48],
    color : new util.Color([0.9216, 0.9216, 0.9216]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  destination_island_5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'destination_island_5', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, (- 0.66)], size : [0.3, 0.6],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  key_resp_8 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  dep_island_23 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'dep_island_23', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.75], size : [0.33, 0.66],
    color : new util.Color([0.0, 0.0, 0.0]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  press9_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'press9_2',
    text: 'Press 9',
    font: 'arial',
    units: 'norm', 
    pos: [0.25, (- 0.05)], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -7.0 
  });
  
  // Initialize components for Routine "show_choice_2"
  show_choice_2Clock = new util.Clock();
  right_choice_6 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'right_choice_6', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0.25, 0.25], size : [0.24, 0.48],
    color : new util.Color([0.9216, 0.9216, 0.9216]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  walking_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'walking_4', units : undefined, 
    image : 'planes/walking.png', mask : undefined,
    ori : 0.0, pos : [0, 0.1], size : [0.24, 0.24],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  dep_island_24 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'dep_island_24', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.75], size : [0.33, 0.66],
    color : new util.Color([0.0, 0.0, 0.0]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  final_state_supposed_to_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'final_state_supposed_to_3', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.5), (- 0.66)], size : [0.15, 0.3],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  inteded_location_4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'inteded_location_4',
    text: 'Treasure Location',
    font: 'Open Sans',
    units: 'norm', 
    pos: [(- 0.5), (- 0.5)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -5.0 
  });
  
  left_choice_6 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'left_choice_6', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.25), 0.25], size : [0.24, 0.48],
    color : new util.Color([0.9216, 0.9216, 0.9216]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  // Initialize components for Routine "feeedback__2"
  feeedback__2Clock = new util.Clock();
  num_consecutive_correct = 0;
  miss_sometimes = false;
  
  tran_selected_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'tran_selected_3', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.24, 0.48],
    color : new util.Color([0.9216, 0.9216, 0.9216]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  text_21 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_21',
    text: 'Press space to continue ',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0, (- 0.35)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -2.0 
  });
  
  next_trial_3 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  walking_6 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'walking_6', units : undefined, 
    image : 'planes/walking.png', mask : undefined,
    ori : 0.0, pos : [0, 0.1], size : [0.24, 0.24],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  dep_island_26 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'dep_island_26', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.75], size : [0.33, 0.66],
    color : new util.Color([0.0, 0.0, 0.0]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  final_state_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'final_state_4', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, (- 0.66)], size : [0.33, 0.66],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  final_state_supposed_to_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'final_state_supposed_to_2', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.5), (- 0.66)], size : [0.15, 0.3],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -7.0 
  });
  counter = new visual.TextStim({
    win: psychoJS.window,
    name: 'counter',
    text: '',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0.5, (- 0.65)], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -8.0 
  });
  
  inteded_location_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'inteded_location_3',
    text: 'Treasure Location',
    font: 'Open Sans',
    units: 'norm', 
    pos: [(- 0.5), (- 0.5)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -11.0 
  });
  
  // Initialize components for Routine "action_prep"
  action_prepClock = new util.Clock();
  set_actions = 1;
  
  warning = new visual.TextStim({
    win: psychoJS.window,
    name: 'warning',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.3), 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -1.0 
  });
  
  ready = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "action_execution"
  action_executionClock = new util.Clock();
  yScale = 0.45;
  minSize = 0.1;
  maxSize = 0.1;
  pathStart = [(- 1), (- 0.95)];
  pathN = 0;
  xScale = ((psychoJS.window.size[0] / psychoJS.window.size[1]) * 0.45);
  posClock = new util.Clock();
  sizeClock = new util.Clock();
  current_pos = [1];
  
  moving_cue_9 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'moving_cue_9', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.15, 0.15],
    color : new util.Color([(- 1.0), (- 1.0), (- 1.0)]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  action = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "feedback"
  feedbackClock = new util.Clock();
  hard = false;
  gor = 0;
  
  text_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_3',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [(- 0.3), 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -2.0 
  });
  
  key_resp_18 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  text_26 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_26',
    text: 'Press space to continue',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0, (- 0.75)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -5.0 
  });
  
  // Initialize components for Routine "open_questions"
  open_questionsClock = new util.Clock();
  textbox = new visual.TextBox({
    win: psychoJS.window,
    name: 'textbox',
    text: '',
    font: 'Open Sans',
    pos: [0, (- 0.2)], letterHeight: 0.05,
    size: [null, null],  units: 'norm', 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    editable: true,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  text_7 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_7',
    text: 'Click on this text to move on (you might need to press slightly below) ',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0, (- 0.75)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -2.0 
  });
  
  mouse = new core.Mouse({
    win: psychoJS.window,
  });
  mouse.mouseClock = new util.Clock();
  text_8 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_8',
    text: '',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0, 0.75], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -4.0 
  });
  
  please_write_more = new visual.TextStim({
    win: psychoJS.window,
    name: 'please_write_more',
    text: 'Your response was not long enough. Please provide us with more detailed feedback in the textbox. \nSpecifically,\n\n1) Which part of the instructions did you find most confusing? \n2) Do you still remmember which transport takes you where or do you prefer a refresher? ',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0, 0.5], height: 0.075,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -6.0 
  });
  
  // Initialize components for Routine "let_the_game_begin"
  let_the_game_beginClock = new util.Clock();
  text_6 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_6',
    text: 'To put it all together, we will now do some practice blocks. \n\nPress space when you are ready to begin!',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -1.0 
  });
  
  key_resp_4 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "init_block"
  init_blockClock = new util.Clock();
  polygon_2 = new visual.Rect ({
    win: psychoJS.window, name: 'polygon_2', 
    width: [5, 5][0], height: [5, 5][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -2, interpolate: true,
  });
  
  // Initialize components for Routine "practice_in_task"
  practice_in_taskClock = new util.Clock();
  start_with = 53;
  
  image_7 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'image_7', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [1.69, 1],
    color : new util.Color([(- 1.0), (- 1.0), (- 1.0)]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  key_resp_first = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "check_action_understanding"
  check_action_understandingClock = new util.Clock();
  test_q_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'test_q_2',
    text: '',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0, 0.75], height: 0.075,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -1.0 
  });
  
  test_action_answer = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  new_platform_5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'new_platform_5', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, (- 0.6)], size : [0.8, 0.464],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  answer_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'answer_2',
    text: '',
    font: 'open sans',
    units: 'norm', 
    pos: [(- 0.5), 0.15], height: 0.075,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -4.0 
  });
  
  // Initialize components for Routine "traveling_to_new_planet"
  traveling_to_new_planetClock = new util.Clock();
  background_color_2 = new visual.Rect ({
    win: psychoJS.window, name: 'background_color_2', 
    width: [5, 5][0], height: [5, 5][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, lineColor: new util.Color('white'),
    fillColor: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),
    opacity: undefined, depth: 0, interpolate: true,
  });
  
  traveling_one = new visual.TextStim({
    win: psychoJS.window,
    name: 'traveling_one',
    text: '',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0, 0.5], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([1.0, 1.0, 1.0]),  opacity: undefined,
    depth: -1.0 
  });
  
  space_ship = new visual.ImageStim({
    win : psychoJS.window,
    name : 'space_ship', units : 'norm', 
    image : 'planes/space_ship.png', mask : undefined,
    ori : 0.0, pos : [0, (- 0.3)], size : [0.75, 0.8],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  // Initialize components for Routine "one_or_three_2"
  one_or_three_2Clock = new util.Clock();
  polygon_23 = new visual.Rect ({
    win: psychoJS.window, name: 'polygon_23', 
    width: [5, 5][0], height: [5, 5][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  
  key_resp_9 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  text_32 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_32',
    text: '',
    font: 'arial',
    units: 'norm', 
    pos: [(- 0.4), 0], height: 0.06,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -3.0 
  });
  
  // Initialize components for Routine "opt_in_choice_3"
  opt_in_choice_3Clock = new util.Clock();
  last_beg = 1;
  
  la_opt_in = [];
  feat_lr = [];
  
  background_color_4 = new visual.Rect ({
    win: psychoJS.window, name: 'background_color_4', 
    width: [5, 5][0], height: [5, 5][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -5, interpolate: true,
  });
  
  dep_island_5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'dep_island_5', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.725], size : [0.33, 0.66],
    color : new util.Color([1.0, 1.0, 1.0]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  comp_choose = new visual.TextStim({
    win: psychoJS.window,
    name: 'comp_choose',
    text: '',
    font: 'arial',
    units: 'norm', 
    pos: [(- 0.4), 0.4], height: 0.075,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -7.0 
  });
  
  here = new visual.TextStim({
    win: psychoJS.window,
    name: 'here',
    text: 'You are here',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0.5, 0.85], height: 0.075,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -8.0 
  });
  
  origin_pointer = new visual.ImageStim({
    win : psychoJS.window,
    name : 'origin_pointer', units : 'norm', 
    image : 'planes/pointer.png', mask : undefined,
    ori : 0.0, pos : [0.25, 0.85], size : [0.22, 0.22],
    color : new util.Color([(- 1.0), (- 1.0), (- 1.0)]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -9.0 
  });
  cur_winnings_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'cur_winnings_3',
    text: '',
    font: 'arial',
    units: 'norm', 
    pos: [0.65, 0.75], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -10.0 
  });
  
  planet_number_5 = new visual.TextStim({
    win: psychoJS.window,
    name: 'planet_number_5',
    text: '',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0.75, (- 0.75)], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -11.0 
  });
  
  total_opt_timedOut=0;
  
  occluded_treasure_2 = new visual.Rect ({
    win: psychoJS.window, name: 'occluded_treasure_2', units : 'norm', 
    width: [0.2, 0.35][0], height: [0.2, 0.35][1],
    ori: 0.0, pos: [0, (- 0.75)],
    lineWidth: 1.0, lineColor: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),
    fillColor: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),
    opacity: undefined, depth: -13, interpolate: true,
  });
  
  text_30 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_30',
    text: 'Treasure Location: Shown after you decide whether to walk or to buy a ticket',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0, (- 0.5)], height: 0.04,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -14.0 
  });
  
  opt_in = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  image_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'image_2', units : 'norm', 
    image : 'opt_inr.jpg', mask : undefined,
    ori : 0.0, pos : [0, 0.26], size : [1.5, 1.5],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -16.0 
  });
  // Initialize components for Routine "timedOut_Lost"
  timedOut_LostClock = new util.Clock();
  polygon_16 = new visual.Rect ({
    win: psychoJS.window, name: 'polygon_16', 
    width: [5, 5][0], height: [5, 5][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -2, interpolate: true,
  });
  
  text_29 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_29',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -3.0 
  });
  
  // Initialize components for Routine "make_choice"
  make_choiceClock = new util.Clock();
  polygon_5 = new visual.Rect ({
    win: psychoJS.window, name: 'polygon_5', 
    width: [5, 5][0], height: [5, 5][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: 0, interpolate: true,
  });
  
  press1_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'press1_2',
    text: 'Press 1 ',
    font: 'arial',
    units: 'norm', 
    pos: [(- 0.25), (- 0.05)], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -2.0 
  });
  
  dep_island = new visual.ImageStim({
    win : psychoJS.window,
    name : 'dep_island', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.725], size : [0.33, 0.66],
    color : new util.Color([1.0, 1.0, 1.0]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  left_choice = new visual.ImageStim({
    win : psychoJS.window,
    name : 'left_choice', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.25), 0.25], size : [0.24, 0.48],
    color : new util.Color([0.9216, 0.9216, 0.9216]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  right_choice = new visual.ImageStim({
    win : psychoJS.window,
    name : 'right_choice', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0.25, 0.25], size : [0.24, 0.48],
    color : new util.Color([0.9216, 0.9216, 0.9216]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  destination_island = new visual.ImageStim({
    win : psychoJS.window,
    name : 'destination_island', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, (- 0.66)], size : [0.33, 0.66],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  key_resp_2 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  cur_winnings = new visual.TextStim({
    win: psychoJS.window,
    name: 'cur_winnings',
    text: '',
    font: 'arial',
    units: 'norm', 
    pos: [(- 0.8), 0.8], height: 0.06,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -8.0 
  });
  
  total_opt_timedOut=0;
  
  press9 = new visual.TextStim({
    win: psychoJS.window,
    name: 'press9',
    text: 'Press 9',
    font: 'arial',
    units: 'norm', 
    pos: [0.25, (- 0.05)], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -10.0 
  });
  
  planet_number_4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'planet_number_4',
    text: '',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0.75, (- 0.75)], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -11.0 
  });
  
  image = new visual.ImageStim({
    win : psychoJS.window,
    name : 'image', units : 'norm', 
    image : 'transport_rules/Slide1.jpeg', mask : undefined,
    ori : 0.0, pos : [0.65, 0.65], size : [0.5, 0.5],
    color : new util.Color('white'), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -12.0 
  });
  text_14 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_14',
    text: '',
    font: 'Open Sans',
    units: 'norm', 
    pos: [(- 0.75), 0.75], height: 0.12,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -13.0 
  });
  
  // Initialize components for Routine "show_choice"
  show_choiceClock = new util.Clock();
  polygon_6 = new visual.Rect ({
    win: psychoJS.window, name: 'polygon_6', 
    width: [5, 5][0], height: [5, 5][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: 0, interpolate: true,
  });
  
  dep_island_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'dep_island_3', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.725], size : [0.33, 0.66],
    color : new util.Color([1.0, 1.0, 1.0]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -2.0 
  });
  right_choice_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'right_choice_3', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0.25, 0.25], size : [0.24, 0.48],
    color : new util.Color([0.9216, 0.9216, 0.9216]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  destination_island_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'destination_island_3', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, (- 0.66)], size : [0.33, 0.66],
    color : new util.Color([1,1,1]), opacity : 0.4,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  left_choice_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'left_choice_3', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.25), 0.25], size : [0.24, 0.48],
    color : new util.Color([0.9216, 0.9216, 0.9216]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  treasure = new visual.TextStim({
    win: psychoJS.window,
    name: 'treasure',
    text: 'Treasure ',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0, (- 0.35)], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: 0.4,
    depth: -6.0 
  });
  
  planet_number_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'planet_number_2',
    text: '',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0.75, (- 0.75)], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -7.0 
  });
  
  key_resp_6 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  buy_Second_ticket = new visual.TextStim({
    win: psychoJS.window,
    name: 'buy_Second_ticket',
    text: "Do you want to purchase the 2nd ticket (cost: 20 coins) to jump from the platform\n\nYes, in case my ride doesn't stop (press y)\nNo I'll wait (press n) \n",
    font: 'arial',
    units: 'norm', 
    pos: [(- 0.35), (- 0.35)], height: 0.06,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -10.0 
  });
  
  action_distinction = new visual.ImageStim({
    win : psychoJS.window,
    name : 'action_distinction', units : 'norm', 
    image : 'distinguiish_actions/Slide3.jpeg', mask : undefined,
    ori : 0.0, pos : [(- 0.7), 0.7], size : [0.4, 0.4],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -11.0 
  });
  // Initialize components for Routine "ok_wait_2"
  ok_wait_2Clock = new util.Clock();
  polygon_3 = new visual.Rect ({
    win: psychoJS.window, name: 'polygon_3', 
    width: [5, 5][0], height: [5, 5][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -2, interpolate: true,
  });
  
  Computer_Selects_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'Computer_Selects_3',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.03)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -4.0 
  });
  
  departure_state_5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'departure_state_5', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.725], size : [0.33, 0.66],
    color : new util.Color([1.0, 1.0, 1.0]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  planet_number_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'planet_number_3',
    text: '',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0.75, (- 0.75)], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -6.0 
  });
  
  eight = new visual.TextStim({
    win: psychoJS.window,
    name: 'eight',
    text: '',
    font: 'open sans',
    units: 'norm', 
    pos: [(- 0.65), 0.75], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -7.0 
  });
  
  tran_selected_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'tran_selected_2', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.2, 0.4],
    color : new util.Color([0.9216, 0.9216, 0.9216]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -8.0 
  });
  walk = new visual.ImageStim({
    win : psychoJS.window,
    name : 'walk', units : undefined, 
    image : 'planes/walking.png', mask : undefined,
    ori : 0.0, pos : [0, 0.1], size : [0.24, 0.24],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -9.0 
  });
  // Initialize components for Routine "action_prep_2"
  action_prep_2Clock = new util.Clock();
  polygon_7 = new visual.Rect ({
    win: psychoJS.window, name: 'polygon_7', 
    width: [5, 5][0], height: [5, 5][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -4, interpolate: true,
  });
  
  warning_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'warning_2',
    text: 'Press the spacebar when your ride is in the middle of the screen\n\nPress space to continue\n\n(timer is running)',
    font: 'Open Sans',
    units: 'norm', 
    pos: [(- 0.4), 0.35], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -5.0 
  });
  
  ready_2 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  new_platform = new visual.ImageStim({
    win : psychoJS.window,
    name : 'new_platform', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, (- 0.5)], size : [0.8, 0.464],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -9.0 
  });
  // Initialize components for Routine "action_exec"
  action_execClock = new util.Clock();
  polygon_9 = new visual.Rect ({
    win: psychoJS.window, name: 'polygon_9', 
    width: [5, 5][0], height: [5, 5][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: 0, interpolate: true,
  });
  
  yScale = 0.45;
  minSize = 0.1;
  maxSize = 0.1;
  pathStart = [(- 1), (- 0.95)];
  pathN = 0;
  xScale = ((psychoJS.window.size[0] / psychoJS.window.size[1]) * 0.45);
  posClock = new util.Clock();
  sizeClock = new util.Clock();
  current_pos = [1];
  
  action_2 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  cue_object_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'cue_object_2', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.5, 0.5],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  moving_cue_7 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'moving_cue_7', units : undefined, 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.15, 0.15],
    color : new util.Color([(- 1.0), (- 1.0), (- 1.0)]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  timer_text = new visual.TextStim({
    win: psychoJS.window,
    name: 'timer_text',
    text: '',
    font: 'open sans',
    units: 'norm', 
    pos: [0.65, 0.75], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -7.0 
  });
  
  // Initialize components for Routine "try_again_2"
  try_again_2Clock = new util.Clock();
   dont_check_again=0; 
  wself2 = 0;
  wself3 = 0;
  rp = 0;
  
  polygon_10 = new visual.Rect ({
    win: psychoJS.window, name: 'polygon_10', 
    width: [5, 5][0], height: [5, 5][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -7, interpolate: true,
  });
  
  choose_again_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'choose_again_2',
    text: '',
    font: 'Open Sans',
    units: 'norm', 
    pos: [(- 0.45), 0.2], height: 0.075,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -8.0 
  });
  
  key_try_again_2 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  new_platform_3 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'new_platform_3', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, (- 0.65)], size : [0.6, 0.348],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -11.0 
  });
  text_4 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_4',
    text: 'Choose to enter',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0, (- 0.3)], height: 0.06,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -12.0 
  });
  
  // Initialize components for Routine "ok_wait"
  ok_waitClock = new util.Clock();
  polygon = new visual.Rect ({
    win: psychoJS.window, name: 'polygon', 
    width: [5, 5][0], height: [5, 5][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -2, interpolate: true,
  });
  
  Computer_Selects = new visual.TextStim({
    win: psychoJS.window,
    name: 'Computer_Selects',
    text: 'Please wait while we evaluate your action...',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, (- 0.03)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -4.0 
  });
  
  final_state_supposed_to_5 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'final_state_supposed_to_5', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.5), (- 0.66)], size : [0.15, 0.3],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  inteded_location_5 = new visual.TextStim({
    win: psychoJS.window,
    name: 'inteded_location_5',
    text: 'Treasure Location',
    font: 'Open Sans',
    units: 'norm', 
    pos: [(- 0.5), (- 0.5)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -6.0 
  });
  
  text_timer2_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_timer2_2',
    text: '',
    font: 'open Sans',
    units: 'norm', 
    pos: [0.65, 0.75], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -8.0 
  });
  
  departure_state_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'departure_state_4', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.725], size : [0.33, 0.66],
    color : new util.Color([1.0, 1.0, 1.0]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -9.0 
  });
  // Initialize components for Routine "timedOUT"
  timedOUTClock = new util.Clock();
  polygon_4 = new visual.Rect ({
    win: psychoJS.window, name: 'polygon_4', 
    width: [5, 5][0], height: [5, 5][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -2, interpolate: true,
  });
  
  text_28 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_28',
    text: 'TIMED OUT!!',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -3.0 
  });
  
  // Initialize components for Routine "feedback_2"
  feedback_2Clock = new util.Clock();
  determined_already = 0;
  success = false;
  
  polygon_11 = new visual.Rect ({
    win: psychoJS.window, name: 'polygon_11', 
    width: [5, 5][0], height: [5, 5][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  
  session1=false;
  tracking_success = [];
  
  departure_state = new visual.ImageStim({
    win : psychoJS.window,
    name : 'departure_state', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0.725], size : [0.33, 0.66],
    color : new util.Color([1.0, 1.0, 1.0]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  final_state = new visual.ImageStim({
    win : psychoJS.window,
    name : 'final_state', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, (- 0.725)], size : [0.33, 0.66],
    color : new util.Color([1.0, 1.0, 1.0]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  specify_reward = new visual.TextStim({
    win: psychoJS.window,
    name: 'specify_reward',
    text: '',
    font: 'Open Sans',
    units: 'norm', 
    pos: [(- 0.85), (- 0.2)], height: 0.09,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -6.0 
  });
  
  tran_selected = new visual.ImageStim({
    win : psychoJS.window,
    name : 'tran_selected', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : [0.2, 0.4],
    color : new util.Color([0.9216, 0.9216, 0.9216]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -7.0 
  });
  final_state_supposed_to = new visual.ImageStim({
    win : psychoJS.window,
    name : 'final_state_supposed_to', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0.7, (- 0.66)], size : [0.15, 0.3],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -8.0 
  });
  inteded_location = new visual.TextStim({
    win: psychoJS.window,
    name: 'inteded_location',
    text: 'Treasure Location',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0.7, (- 0.5)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -9.0 
  });
  
  text_17 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_17',
    text: 'Press space to continue',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0, (- 0.2)], height: 0.075,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -12.0 
  });
  
  image_8 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'image_8', units : 'norm', 
    image : 'transport_rules/Slide1.jpeg', mask : undefined,
    ori : 0.0, pos : [0.65, 0.65], size : [0.5, 0.5],
    color : new util.Color('white'), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -13.0 
  });
  key_resp_13 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  selected_transport = new visual.ImageStim({
    win : psychoJS.window,
    name : 'selected_transport', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0.7, 0.15], size : [0.15, 0.3],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -15.0 
  });
  walking = new visual.ImageStim({
    win : psychoJS.window,
    name : 'walking', units : undefined, 
    image : 'planes/walking.png', mask : undefined,
    ori : 0.0, pos : [0, 0.1], size : [0.24, 0.24],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -16.0 
  });
  new_platform_4 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'new_platform_4', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [(- 0.7), 0.4], size : [0.5, 0.348],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -17.0 
  });
  selected_transport_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'selected_transport_3',
    text: 'You had selected \n(but not necessarily gotten on)',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0.7, 0.32], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -18.0 
  });
  
  specify_reward_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'specify_reward_2',
    text: '',
    font: 'Open Sans',
    units: 'norm', 
    pos: [(- 0.85), (- 0.2)], height: 0.09,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -19.0 
  });
  
  action_reminder = new visual.TextStim({
    win: psychoJS.window,
    name: 'action_reminder',
    text: 'Tickets ',
    font: 'Open Sans',
    units: 'norm', 
    pos: [(- 0.7), 0.7], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -20.0 
  });
  
  // Initialize components for Routine "excited"
  excitedClock = new util.Clock();
  trials_last_query_e = 0;
  opt_out_won_e = 0;
  opt_out_lost_e = 0;
  opt_in_lost_high_e = 0;
  opt_in_lost_e = 0;
  opt_in_won_e = 0;
  trials_last_query_s = 0;
  
  polygon_18 = new visual.Rect ({
    win: psychoJS.window, name: 'polygon_18', 
    width: [5, 5][0], height: [5, 5][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -2, interpolate: true,
  });
  
  excited_query = new visual.TextStim({
    win: psychoJS.window,
    name: 'excited_query',
    text: 'Please indicate how you feel right now\nYou can click anywhere on the line \n\n(your answer will be recorded wherever you click) ',
    font: 'Open sans',
    units: 'norm', 
    pos: [(- 0.5), 0.46], height: 0.08,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -3.0 
  });
  
  excited_title = new visual.TextStim({
    win: psychoJS.window,
    name: 'excited_title',
    text: 'How excited are you?',
    font: 'Open Sans',
    units: 'norm', 
    pos: [(- 0.5), 0.75], height: 0.17,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -4.0 
  });
  
  slider_excited = new visual.Slider({
    win: psychoJS.window, name: 'slider_excited',
    size: [1.15, 0.1], pos: [0, (- 0.3)], units: 'norm',
    labels: ["Extremely deflated", "Extremely excited"], fontSize: 0.07, ticks: [1, 4],
    granularity: 0.0, style: ["RATING"],
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]), markerColor: new util.Color([0.0039, (- 1.0), (- 1.0)]), lineColor: new util.Color([(- 1.0), (- 1.0), (- 1.0)]), 
    fontFamily: 'Open Sans', bold: true, italic: false, depth: -5, 
    flip: false,
  });
  
  // Initialize components for Routine "content"
  contentClock = new util.Clock();
  trials_last_query = 0;
  trials_last_query_t = 0;
  opt_out_won = 0;
  opt_out_lost = 0;
  opt_in_lost_high = 0;
  opt_in_lost = 0;
  opt_in_won = 0;
  
  polygon_19 = new visual.Rect ({
    win: psychoJS.window, name: 'polygon_19', 
    width: [5, 5][0], height: [5, 5][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -2, interpolate: true,
  });
  
  content_query_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'content_query_2',
    text: '\n\nPlease indicate how you feel right now\nYou can click anywhere on the line \n\n(your answer will be recorded wherever you click) ',
    font: 'Open sans',
    units: 'norm', 
    pos: [(- 0.5), 0.52], height: 0.08,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -3.0 
  });
  
  content_title = new visual.TextStim({
    win: psychoJS.window,
    name: 'content_title',
    text: 'How frustrated are you?',
    font: 'Open Sans',
    units: 'norm', 
    pos: [(- 0.5), 0.75], height: 0.17,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -4.0 
  });
  
  slider_7 = new visual.Slider({
    win: psychoJS.window, name: 'slider_7',
    size: [1.08, 0.1], pos: [0, (- 0.35)], units: 'norm',
    labels: ["Extremely content", "Extremely frustrated"], fontSize: 0.07, ticks: [1, 4],
    granularity: 0.0, style: ["RATING"],
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]), markerColor: new util.Color([0.0039, (- 1.0), (- 1.0)]), lineColor: new util.Color([(- 1.0), (- 1.0), (- 1.0)]), 
    fontFamily: 'Open Sans', bold: true, italic: false, depth: -5, 
    flip: false,
  });
  
  // Initialize components for Routine "num_tickets_query"
  num_tickets_queryClock = new util.Clock();
  polygon_24 = new visual.Rect ({
    win: psychoJS.window, name: 'polygon_24', 
    width: [5, 5][0], height: [5, 5][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, lineColor: new util.Color('white'),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  
  ticket_officer_query_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'ticket_officer_query_3',
    text: 'CORRECT ANSWER EARNS +500 bonus! \n\nOn this planet, the optimal number of tickets to buy is:',
    font: 'Open sans',
    units: 'norm', 
    pos: [0, 0.1], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -2.0 
  });
  
  slider_3 = new visual.Slider({
    win: psychoJS.window, name: 'slider_3',
    size: [1.0, 0.1], pos: [0, (- 0.7)], units: 'norm',
    labels: ["0 tickets", "1 ticket", "2 tickets", "3 tickets"], fontSize: 0.05, ticks: [1, 2, 3, 4],
    granularity: 0.0, style: ["RATING"],
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]), markerColor: new util.Color([0.0039, (- 1.0), (- 1.0)]), lineColor: new util.Color([(- 1.0), (- 1.0), (- 1.0)]), 
    fontFamily: 'Open Sans', bold: true, italic: false, depth: -3, 
    flip: false,
  });
  
  // Initialize components for Routine "breather_2"
  breather_2Clock = new util.Clock();
  function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }
  
  function logisticRegression(features, labels, iterations, learningRate) {
    features = features.map(feature => [1, feature]);
  
    let weights = Array(features[0].length).fill(0);
  
    for (let i = 0; i < iterations; i++) {
      const predictions = features.map(point => sigmoid(dotProduct(point, weights)));
  
      // calculate errors
      const errors = labels.map((label, index) => label - predictions[index]);
  
      // calculate gradients
      const gradients = features.map(
        (point, index) => point.map(value => value * errors[index])
      );
  
      // calculate mean gradients
      const meanGradients = gradients.reduce(
        (accumulator, currentValue) =>
          accumulator.map((value, index) => value + currentValue[index])
      ).map(value => value * (1 / features.length));
  
      // update weights
      weights = weights.map(
        (weight, index) => weight + learningRate * meanGradients[index]
      );
    }
  
    return weights;
  }
  
  // dot product function
  function dotProduct(a, b) {
    return a.reduce((accumulator, currentValue, currentIndex) =>
      accumulator + currentValue * b[currentIndex],
      0
    );
  }
  text_16 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_16',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -1.0 
  });
  
  key_resp_10 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "risk_choices_2"
  risk_choices_2Clock = new util.Clock();
  function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
  }
  
  function logisticRegression(features, labels, iterations, learningRate) {
    features = features.map(feature => [1, feature]);
  
    let weights = Array(features[0].length).fill(0);
  
    for (let i = 0; i < iterations; i++) {
      const predictions = features.map(point => sigmoid(dotProduct(point, weights)));
  
      // calculate errors
      const errors = labels.map((label, index) => label - predictions[index]);
  
      // calculate gradients
      const gradients = features.map(
        (point, index) => point.map(value => value * errors[index])
      );
  
      // calculate mean gradients
      const meanGradients = gradients.reduce(
        (accumulator, currentValue) =>
          accumulator.map((value, index) => value + currentValue[index])
      ).map(value => value * (1 / features.length));
  
      // update weights
      weights = weights.map(
        (weight, index) => weight + learningRate * meanGradients[index]
      );
    }
  
    return weights;
  }
  
  // dot product function
  function dotProduct(a, b) {
    return a.reduce((accumulator, currentValue, currentIndex) =>
      accumulator + currentValue * b[currentIndex],
      0
    );
  }
  coins = 0;
  win_prob = 0;
  varie_size = [1.69, 1];
  varie_position = [0, 0];
  
  test_q_6 = new visual.TextStim({
    win: psychoJS.window,
    name: 'test_q_6',
    text: '',
    font: 'Open Sans',
    units: 'norm', 
    pos: [(- 0.4), 0.75], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -4.0 
  });
  
  answer = new visual.TextStim({
    win: psychoJS.window,
    name: 'answer',
    text: '',
    font: 'Open Sans',
    units: 'norm', 
    pos: [(- 0.4), 0.5], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -5.0 
  });
  
  image_9 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'image_9', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, 0], size : 1.0,
    color : new util.Color([(- 1.0), (- 1.0), (- 1.0)]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  text_31 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_31',
    text: "Don't take gamble: press A\nTake gamble : press B",
    font: 'arial',
    units: 'norm', 
    pos: [(- 1.15), 1.25], height: 0.099,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -8.0 
  });
  
  key_resp_16 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "gamblingoutcome"
  gamblingoutcomeClock = new util.Clock();
  background_color_3 = new visual.Rect ({
    win: psychoJS.window, name: 'background_color_3', 
    width: [5, 5][0], height: [5, 5][1],
    ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, lineColor: new util.Color('white'),
    fillColor: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),
    opacity: undefined, depth: -1, interpolate: true,
  });
  
  traveling_one_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'traveling_one_2',
    text: '',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0, 0.5], height: 0.1,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([1.0, 1.0, 1.0]),  opacity: undefined,
    depth: -2.0 
  });
  
  space_ship_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'space_ship_2', units : 'norm', 
    image : undefined, mask : undefined,
    ori : 0.0, pos : [0, (- 0.5)], size : [0.75, 0.8],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  // Initialize components for Routine "gamble_outcome"
  gamble_outcomeClock = new util.Clock();
  text_27 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_27',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), 0.0902]),  opacity: undefined,
    depth: -1.0 
  });
  
  key_resp_20 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "open_questions_2"
  open_questions_2Clock = new util.Clock();
  textbox_2 = new visual.TextBox({
    win: psychoJS.window,
    name: 'textbox_2',
    text: '',
    font: 'Open Sans',
    pos: [0, (- 0.2)], letterHeight: 0.05,
    size: [null, null],  units: 'norm', 
    color: [(- 1.0), (- 1.0), (- 1.0)], colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    editable: true,
    multiline: true,
    anchor: 'center',
    depth: -1.0 
  });
  
  text_18 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_18',
    text: 'Press this button to move on (you might need to press slightly below) ',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0, (- 0.75)], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -2.0 
  });
  
  mouse_2 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_2.mouseClock = new util.Clock();
  text_19 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_19',
    text: '',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0, 0.75], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -4.0 
  });
  
  please_write_more_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'please_write_more_2',
    text: 'Please provide us with more detailed feedback in the textbox. \nSpecifically,\n1) Did you feel like overall you were able to do well in the task\n2) Was there anything confusing to you about the task?',
    font: 'Open Sans',
    units: 'norm', 
    pos: [0, 0.5], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -6.0 
  });
  
  // Initialize components for Routine "end_experiment"
  end_experimentClock = new util.Clock();
  text_13 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_13',
    text: 'To complete the final phase of the study (5 more min!) press space and on the following screen press "OK". \n\nWhen you see "Thank you for participating" You MUST PRESS OK and be redirected to another link. \n\nOtherwise your data will not be saved and you WILL NOT receive credit. \n\nPress space to and then ok to continue',
    font: 'Open Sans',
    units: 'norm', 
    pos: [(- 0.4), 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    color: new util.Color([(- 1.0), (- 1.0), (- 1.0)]),  opacity: undefined,
    depth: -3.0 
  });
  
  key_resp_7 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var sub_data;
var datasub;
var part_id;
var s;
var numIterations;
var learningRate;
var init_codeComponents;
function init_codeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'init_code'-------
    t = 0;
    init_codeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    sub_data = new TrialHandler({
            psychoJS: psychoJS,
            nReps: 1, method: TrialHandler.Method.RANDOM,
            extraInfo: expInfo, originPath: undefined,
            trialList: 'subject_breakdown.csv',
            seed: undefined, name: 'sub_data'
    });
    
    datasub = sub_data.getTrialList();
    //which_four=randint(1,490);
    
    
    //w_env_1=datasub[0]['w_env']  // row 1
    //w_env_2=datasub[1]['w_env']  // row 2
    
    // If you want to create two arrays for two types of condition, 
    // you can filter the list of objects based on a variable in conditions file 
    // e.g., column labelled "condition" for condition 0 and condition 1
    //cond0 = trialList.filter((trial) => trial['condition']==0)
    //cond1 = trialList.filter((trial) => trial['condition']==1) 
    
    
    
    
    if (expInfo["participant"].length) {
        part_id = expInfo["participant"];
        s = "id was succesful";
    } else {
        part_id = randint(3, 60);
    }
    psychoJS.experiment.addData("id_number", (part_id * 10000));
    psychoJS.experiment.addData("participant", (part_id * 10000));
    
    // sigmoid function
    function sigmoid(x) {
      return 1 / (1 + Math.exp(-x));
    }
    
    // logistic regression function
    function logisticRegression(features, labels, iterations, learningRate) {
      // add intercept column of 1s to features
      features = features.map(feature => [1, feature]);
    
      // initialize weights
      let weights = Array(features[0].length).fill(0);
    
      for (let i = 0; i < iterations; i++) {
        // calculate predictions
        const predictions = features.map(point => sigmoid(dotProduct(point, weights)));
    
        // calculate errors
        const errors = labels.map((label, index) => label - predictions[index]);
    
        // calculate gradients
        const gradients = features.map(
          (point, index) => point.map(value => value * errors[index])
        );
    
        // calculate mean gradients
        const meanGradients = gradients.reduce(
          (accumulator, currentValue) =>
            accumulator.map((value, index) => value + currentValue[index])
        ).map(value => value * (1 / features.length));
    
        // update weights
        weights = weights.map(
          (weight, index) => weight + learningRate * meanGradients[index]
        );
      }
    
      return weights;
    }
    
    // dot product function
    function dotProduct(a, b) {
      return a.reduce((accumulator, currentValue, currentIndex) =>
        accumulator + currentValue * b[currentIndex],
        0
      );
    }
    
    
    //features = [[.1],[ .2],[ .5],[ .7],[.4],[.4],[.4],[.4],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.1],[ .2],[ .5],[ .7],[.4],[.4],[.4],[.4],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.1],[ .2],[ .5],[ .7],[.4],[.4],[.4],[.4],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.1],[ .2],[ .5],[ .7],[.4],[.4],[.4],[.4],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.1],[ .2],[ .5],[ .7],[.4],[.4],[.4],[.4],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.1],[ .2],[ .5],[ .7],[.4],[.4],[.4],[.4],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9],[.9]];
    
    //labels = [0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1];
    numIterations = 120000;
    learningRate = 0.01;
    
    //var weight = logisticRegression(features, labels, numIterations, learningRate);
    //console.log(weight);
    // keep track of which components have finished
    init_codeComponents = [];
    
    init_codeComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function init_codeRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'init_code'-------
    // get current time
    t = init_codeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    init_codeComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function init_codeRoutineEnd() {
  return async function () {
    //------Ending Routine 'init_code'-------
    init_codeComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "init_code" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var consent_loop;
var currentLoop;
function consent_loopLoopBegin(consent_loopLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    consent_loop = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 5, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'consent_loop'
    });
    psychoJS.experiment.addLoop(consent_loop); // add the loop to the experiment
    currentLoop = consent_loop;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    consent_loop.forEach(function() {
      const snapshot = consent_loop.getSnapshot();
    
      consent_loopLoopScheduler.add(importConditions(snapshot));
      consent_loopLoopScheduler.add(consent_form_1RoutineBegin(snapshot));
      consent_loopLoopScheduler.add(consent_form_1RoutineEachFrame());
      consent_loopLoopScheduler.add(consent_form_1RoutineEnd());
      consent_loopLoopScheduler.add(consent_form_2RoutineBegin(snapshot));
      consent_loopLoopScheduler.add(consent_form_2RoutineEachFrame());
      consent_loopLoopScheduler.add(consent_form_2RoutineEnd());
      consent_loopLoopScheduler.add(consent_form_3RoutineBegin(snapshot));
      consent_loopLoopScheduler.add(consent_form_3RoutineEachFrame());
      consent_loopLoopScheduler.add(consent_form_3RoutineEnd());
      consent_loopLoopScheduler.add(consent_form_4RoutineBegin(snapshot));
      consent_loopLoopScheduler.add(consent_form_4RoutineEachFrame());
      consent_loopLoopScheduler.add(consent_form_4RoutineEnd());
      consent_loopLoopScheduler.add(consent_5RoutineBegin(snapshot));
      consent_loopLoopScheduler.add(consent_5RoutineEachFrame());
      consent_loopLoopScheduler.add(consent_5RoutineEnd());
      consent_loopLoopScheduler.add(endLoopIteration(consent_loopLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function consent_loopLoopEnd() {
  psychoJS.experiment.removeLoop(consent_loop);

  return Scheduler.Event.NEXT;
}


var loop1;
function loop1LoopBegin(loop1LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    loop1 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 5, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'loop1'
    });
    psychoJS.experiment.addLoop(loop1); // add the loop to the experiment
    currentLoop = loop1;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    loop1.forEach(function() {
      const snapshot = loop1.getSnapshot();
    
      loop1LoopScheduler.add(importConditions(snapshot));
      const review_firstLoopScheduler = new Scheduler(psychoJS);
      loop1LoopScheduler.add(review_firstLoopBegin(review_firstLoopScheduler, snapshot));
      loop1LoopScheduler.add(review_firstLoopScheduler);
      loop1LoopScheduler.add(review_firstLoopEnd);
      const round1LoopScheduler = new Scheduler(psychoJS);
      loop1LoopScheduler.add(round1LoopBegin(round1LoopScheduler, snapshot));
      loop1LoopScheduler.add(round1LoopScheduler);
      loop1LoopScheduler.add(round1LoopEnd);
      loop1LoopScheduler.add(endLoopIteration(loop1LoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


var review_first;
function review_firstLoopBegin(review_firstLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    review_first = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 20, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'review_first'
    });
    psychoJS.experiment.addLoop(review_first); // add the loop to the experiment
    currentLoop = review_first;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    review_first.forEach(function() {
      const snapshot = review_first.getSnapshot();
    
      review_firstLoopScheduler.add(importConditions(snapshot));
      review_firstLoopScheduler.add(review_routesRoutineBegin(snapshot));
      review_firstLoopScheduler.add(review_routesRoutineEachFrame());
      review_firstLoopScheduler.add(review_routesRoutineEnd());
      review_firstLoopScheduler.add(endLoopIteration(review_firstLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function review_firstLoopEnd() {
  psychoJS.experiment.removeLoop(review_first);

  return Scheduler.Event.NEXT;
}


var round1;
function round1LoopBegin(round1LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    round1 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 4, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'round1'
    });
    psychoJS.experiment.addLoop(round1); // add the loop to the experiment
    currentLoop = round1;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    round1.forEach(function() {
      const snapshot = round1.getSnapshot();
    
      round1LoopScheduler.add(importConditions(snapshot));
      round1LoopScheduler.add(quizRoutineBegin(snapshot));
      round1LoopScheduler.add(quizRoutineEachFrame());
      round1LoopScheduler.add(quizRoutineEnd());
      round1LoopScheduler.add(endLoopIteration(round1LoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function round1LoopEnd() {
  psychoJS.experiment.removeLoop(round1);

  return Scheduler.Event.NEXT;
}


async function loop1LoopEnd() {
  psychoJS.experiment.removeLoop(loop1);

  return Scheduler.Event.NEXT;
}


var loop2;
function loop2LoopBegin(loop2LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    loop2 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 25, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'loop2'
    });
    psychoJS.experiment.addLoop(loop2); // add the loop to the experiment
    currentLoop = loop2;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    loop2.forEach(function() {
      const snapshot = loop2.getSnapshot();
    
      loop2LoopScheduler.add(importConditions(snapshot));
      const review_secondLoopScheduler = new Scheduler(psychoJS);
      loop2LoopScheduler.add(review_secondLoopBegin(review_secondLoopScheduler, snapshot));
      loop2LoopScheduler.add(review_secondLoopScheduler);
      loop2LoopScheduler.add(review_secondLoopEnd);
      const round2LoopScheduler = new Scheduler(psychoJS);
      loop2LoopScheduler.add(round2LoopBegin(round2LoopScheduler, snapshot));
      loop2LoopScheduler.add(round2LoopScheduler);
      loop2LoopScheduler.add(round2LoopEnd);
      loop2LoopScheduler.add(endLoopIteration(loop2LoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


var review_second;
function review_secondLoopBegin(review_secondLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    review_second = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 52, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'review_second'
    });
    psychoJS.experiment.addLoop(review_second); // add the loop to the experiment
    currentLoop = review_second;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    review_second.forEach(function() {
      const snapshot = review_second.getSnapshot();
    
      review_secondLoopScheduler.add(importConditions(snapshot));
      review_secondLoopScheduler.add(review_routesRoutineBegin(snapshot));
      review_secondLoopScheduler.add(review_routesRoutineEachFrame());
      review_secondLoopScheduler.add(review_routesRoutineEnd());
      review_secondLoopScheduler.add(endLoopIteration(review_secondLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function review_secondLoopEnd() {
  psychoJS.experiment.removeLoop(review_second);

  return Scheduler.Event.NEXT;
}


var round2;
function round2LoopBegin(round2LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    round2 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 3, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'round2'
    });
    psychoJS.experiment.addLoop(round2); // add the loop to the experiment
    currentLoop = round2;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    round2.forEach(function() {
      const snapshot = round2.getSnapshot();
    
      round2LoopScheduler.add(importConditions(snapshot));
      round2LoopScheduler.add(quizRoutineBegin(snapshot));
      round2LoopScheduler.add(quizRoutineEachFrame());
      round2LoopScheduler.add(quizRoutineEnd());
      round2LoopScheduler.add(endLoopIteration(round2LoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function round2LoopEnd() {
  psychoJS.experiment.removeLoop(round2);

  return Scheduler.Event.NEXT;
}


async function loop2LoopEnd() {
  psychoJS.experiment.removeLoop(loop2);

  return Scheduler.Event.NEXT;
}


var walk_examples;
function walk_examplesLoopBegin(walk_examplesLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    walk_examples = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 4, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'walk_examples'
    });
    psychoJS.experiment.addLoop(walk_examples); // add the loop to the experiment
    currentLoop = walk_examples;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    walk_examples.forEach(function() {
      const snapshot = walk_examples.getSnapshot();
    
      walk_examplesLoopScheduler.add(importConditions(snapshot));
      walk_examplesLoopScheduler.add(make_fake_choiceRoutineBegin(snapshot));
      walk_examplesLoopScheduler.add(make_fake_choiceRoutineEachFrame());
      walk_examplesLoopScheduler.add(make_fake_choiceRoutineEnd());
      walk_examplesLoopScheduler.add(show_fake_choiceRoutineBegin(snapshot));
      walk_examplesLoopScheduler.add(show_fake_choiceRoutineEachFrame());
      walk_examplesLoopScheduler.add(show_fake_choiceRoutineEnd());
      walk_examplesLoopScheduler.add(feeedbackssRoutineBegin(snapshot));
      walk_examplesLoopScheduler.add(feeedbackssRoutineEachFrame());
      walk_examplesLoopScheduler.add(feeedbackssRoutineEnd());
      walk_examplesLoopScheduler.add(endLoopIteration(walk_examplesLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function walk_examplesLoopEnd() {
  psychoJS.experiment.removeLoop(walk_examples);

  return Scheduler.Event.NEXT;
}


var loop3;
function loop3LoopBegin(loop3LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    loop3 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 52, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'loop3'
    });
    psychoJS.experiment.addLoop(loop3); // add the loop to the experiment
    currentLoop = loop3;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    loop3.forEach(function() {
      const snapshot = loop3.getSnapshot();
    
      loop3LoopScheduler.add(importConditions(snapshot));
      const review_thirdLoopScheduler = new Scheduler(psychoJS);
      loop3LoopScheduler.add(review_thirdLoopBegin(review_thirdLoopScheduler, snapshot));
      loop3LoopScheduler.add(review_thirdLoopScheduler);
      loop3LoopScheduler.add(review_thirdLoopEnd);
      const round3LoopScheduler = new Scheduler(psychoJS);
      loop3LoopScheduler.add(round3LoopBegin(round3LoopScheduler, snapshot));
      loop3LoopScheduler.add(round3LoopScheduler);
      loop3LoopScheduler.add(round3LoopEnd);
      loop3LoopScheduler.add(endLoopIteration(loop3LoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


var review_third;
function review_thirdLoopBegin(review_thirdLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    review_third = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 52, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'review_third'
    });
    psychoJS.experiment.addLoop(review_third); // add the loop to the experiment
    currentLoop = review_third;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    review_third.forEach(function() {
      const snapshot = review_third.getSnapshot();
    
      review_thirdLoopScheduler.add(importConditions(snapshot));
      review_thirdLoopScheduler.add(review_routesRoutineBegin(snapshot));
      review_thirdLoopScheduler.add(review_routesRoutineEachFrame());
      review_thirdLoopScheduler.add(review_routesRoutineEnd());
      review_thirdLoopScheduler.add(endLoopIteration(review_thirdLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function review_thirdLoopEnd() {
  psychoJS.experiment.removeLoop(review_third);

  return Scheduler.Event.NEXT;
}


var round3;
function round3LoopBegin(round3LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    round3 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 4, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'round3'
    });
    psychoJS.experiment.addLoop(round3); // add the loop to the experiment
    currentLoop = round3;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    round3.forEach(function() {
      const snapshot = round3.getSnapshot();
    
      round3LoopScheduler.add(importConditions(snapshot));
      round3LoopScheduler.add(quizRoutineBegin(snapshot));
      round3LoopScheduler.add(quizRoutineEachFrame());
      round3LoopScheduler.add(quizRoutineEnd());
      round3LoopScheduler.add(endLoopIteration(round3LoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function round3LoopEnd() {
  psychoJS.experiment.removeLoop(round3);

  return Scheduler.Event.NEXT;
}


async function loop3LoopEnd() {
  psychoJS.experiment.removeLoop(loop3);

  return Scheduler.Event.NEXT;
}


var see_actions;
function see_actionsLoopBegin(see_actionsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    see_actions = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 16, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'see_actions'
    });
    psychoJS.experiment.addLoop(see_actions); // add the loop to the experiment
    currentLoop = see_actions;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    see_actions.forEach(function() {
      const snapshot = see_actions.getSnapshot();
    
      see_actionsLoopScheduler.add(importConditions(snapshot));
      see_actionsLoopScheduler.add(new_examplesRoutineBegin(snapshot));
      see_actionsLoopScheduler.add(new_examplesRoutineEachFrame());
      see_actionsLoopScheduler.add(new_examplesRoutineEnd());
      see_actionsLoopScheduler.add(opt_in_choice_2RoutineBegin(snapshot));
      see_actionsLoopScheduler.add(opt_in_choice_2RoutineEachFrame());
      see_actionsLoopScheduler.add(opt_in_choice_2RoutineEnd());
      see_actionsLoopScheduler.add(make_choice_2RoutineBegin(snapshot));
      see_actionsLoopScheduler.add(make_choice_2RoutineEachFrame());
      see_actionsLoopScheduler.add(make_choice_2RoutineEnd());
      see_actionsLoopScheduler.add(show_choice_2RoutineBegin(snapshot));
      see_actionsLoopScheduler.add(show_choice_2RoutineEachFrame());
      see_actionsLoopScheduler.add(show_choice_2RoutineEnd());
      see_actionsLoopScheduler.add(feeedback__2RoutineBegin(snapshot));
      see_actionsLoopScheduler.add(feeedback__2RoutineEachFrame());
      see_actionsLoopScheduler.add(feeedback__2RoutineEnd());
      see_actionsLoopScheduler.add(endLoopIteration(see_actionsLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function see_actionsLoopEnd() {
  psychoJS.experiment.removeLoop(see_actions);

  return Scheduler.Event.NEXT;
}


var loop4;
function loop4LoopBegin(loop4LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    loop4 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 52, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'loop4'
    });
    psychoJS.experiment.addLoop(loop4); // add the loop to the experiment
    currentLoop = loop4;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    loop4.forEach(function() {
      const snapshot = loop4.getSnapshot();
    
      loop4LoopScheduler.add(importConditions(snapshot));
      const review_fourthLoopScheduler = new Scheduler(psychoJS);
      loop4LoopScheduler.add(review_fourthLoopBegin(review_fourthLoopScheduler, snapshot));
      loop4LoopScheduler.add(review_fourthLoopScheduler);
      loop4LoopScheduler.add(review_fourthLoopEnd);
      const round4LoopScheduler = new Scheduler(psychoJS);
      loop4LoopScheduler.add(round4LoopBegin(round4LoopScheduler, snapshot));
      loop4LoopScheduler.add(round4LoopScheduler);
      loop4LoopScheduler.add(round4LoopEnd);
      loop4LoopScheduler.add(endLoopIteration(loop4LoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


var review_fourth;
function review_fourthLoopBegin(review_fourthLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    review_fourth = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 52, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'review_fourth'
    });
    psychoJS.experiment.addLoop(review_fourth); // add the loop to the experiment
    currentLoop = review_fourth;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    review_fourth.forEach(function() {
      const snapshot = review_fourth.getSnapshot();
    
      review_fourthLoopScheduler.add(importConditions(snapshot));
      review_fourthLoopScheduler.add(review_routesRoutineBegin(snapshot));
      review_fourthLoopScheduler.add(review_routesRoutineEachFrame());
      review_fourthLoopScheduler.add(review_routesRoutineEnd());
      review_fourthLoopScheduler.add(endLoopIteration(review_fourthLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function review_fourthLoopEnd() {
  psychoJS.experiment.removeLoop(review_fourth);

  return Scheduler.Event.NEXT;
}


var round4;
function round4LoopBegin(round4LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    round4 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 4, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'round4'
    });
    psychoJS.experiment.addLoop(round4); // add the loop to the experiment
    currentLoop = round4;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    round4.forEach(function() {
      const snapshot = round4.getSnapshot();
    
      round4LoopScheduler.add(importConditions(snapshot));
      round4LoopScheduler.add(quizRoutineBegin(snapshot));
      round4LoopScheduler.add(quizRoutineEachFrame());
      round4LoopScheduler.add(quizRoutineEnd());
      round4LoopScheduler.add(endLoopIteration(round4LoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function round4LoopEnd() {
  psychoJS.experiment.removeLoop(round4);

  return Scheduler.Event.NEXT;
}


async function loop4LoopEnd() {
  psychoJS.experiment.removeLoop(loop4);

  return Scheduler.Event.NEXT;
}


var miss_ride_sometimes;
function miss_ride_sometimesLoopBegin(miss_ride_sometimesLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    miss_ride_sometimes = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 5, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'miss_ride_sometimes'
    });
    psychoJS.experiment.addLoop(miss_ride_sometimes); // add the loop to the experiment
    currentLoop = miss_ride_sometimes;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    miss_ride_sometimes.forEach(function() {
      const snapshot = miss_ride_sometimes.getSnapshot();
    
      miss_ride_sometimesLoopScheduler.add(importConditions(snapshot));
      miss_ride_sometimesLoopScheduler.add(new_examplesRoutineBegin(snapshot));
      miss_ride_sometimesLoopScheduler.add(new_examplesRoutineEachFrame());
      miss_ride_sometimesLoopScheduler.add(new_examplesRoutineEnd());
      miss_ride_sometimesLoopScheduler.add(opt_in_choice_2RoutineBegin(snapshot));
      miss_ride_sometimesLoopScheduler.add(opt_in_choice_2RoutineEachFrame());
      miss_ride_sometimesLoopScheduler.add(opt_in_choice_2RoutineEnd());
      miss_ride_sometimesLoopScheduler.add(make_choice_2RoutineBegin(snapshot));
      miss_ride_sometimesLoopScheduler.add(make_choice_2RoutineEachFrame());
      miss_ride_sometimesLoopScheduler.add(make_choice_2RoutineEnd());
      miss_ride_sometimesLoopScheduler.add(show_choice_2RoutineBegin(snapshot));
      miss_ride_sometimesLoopScheduler.add(show_choice_2RoutineEachFrame());
      miss_ride_sometimesLoopScheduler.add(show_choice_2RoutineEnd());
      miss_ride_sometimesLoopScheduler.add(feeedback__2RoutineBegin(snapshot));
      miss_ride_sometimesLoopScheduler.add(feeedback__2RoutineEachFrame());
      miss_ride_sometimesLoopScheduler.add(feeedback__2RoutineEnd());
      miss_ride_sometimesLoopScheduler.add(endLoopIteration(miss_ride_sometimesLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function miss_ride_sometimesLoopEnd() {
  psychoJS.experiment.removeLoop(miss_ride_sometimes);

  return Scheduler.Event.NEXT;
}


var loop5;
function loop5LoopBegin(loop5LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    loop5 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 145, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'loop5'
    });
    psychoJS.experiment.addLoop(loop5); // add the loop to the experiment
    currentLoop = loop5;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    loop5.forEach(function() {
      const snapshot = loop5.getSnapshot();
    
      loop5LoopScheduler.add(importConditions(snapshot));
      const review_fifthLoopScheduler = new Scheduler(psychoJS);
      loop5LoopScheduler.add(review_fifthLoopBegin(review_fifthLoopScheduler, snapshot));
      loop5LoopScheduler.add(review_fifthLoopScheduler);
      loop5LoopScheduler.add(review_fifthLoopEnd);
      const round5LoopScheduler = new Scheduler(psychoJS);
      loop5LoopScheduler.add(round5LoopBegin(round5LoopScheduler, snapshot));
      loop5LoopScheduler.add(round5LoopScheduler);
      loop5LoopScheduler.add(round5LoopEnd);
      loop5LoopScheduler.add(endLoopIteration(loop5LoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


var review_fifth;
function review_fifthLoopBegin(review_fifthLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    review_fifth = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 52, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'review_fifth'
    });
    psychoJS.experiment.addLoop(review_fifth); // add the loop to the experiment
    currentLoop = review_fifth;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    review_fifth.forEach(function() {
      const snapshot = review_fifth.getSnapshot();
    
      review_fifthLoopScheduler.add(importConditions(snapshot));
      review_fifthLoopScheduler.add(review_routesRoutineBegin(snapshot));
      review_fifthLoopScheduler.add(review_routesRoutineEachFrame());
      review_fifthLoopScheduler.add(review_routesRoutineEnd());
      review_fifthLoopScheduler.add(endLoopIteration(review_fifthLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function review_fifthLoopEnd() {
  psychoJS.experiment.removeLoop(review_fifth);

  return Scheduler.Event.NEXT;
}


var round5;
function round5LoopBegin(round5LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    round5 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 3, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'round5'
    });
    psychoJS.experiment.addLoop(round5); // add the loop to the experiment
    currentLoop = round5;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    round5.forEach(function() {
      const snapshot = round5.getSnapshot();
    
      round5LoopScheduler.add(importConditions(snapshot));
      round5LoopScheduler.add(quizRoutineBegin(snapshot));
      round5LoopScheduler.add(quizRoutineEachFrame());
      round5LoopScheduler.add(quizRoutineEnd());
      round5LoopScheduler.add(endLoopIteration(round5LoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function round5LoopEnd() {
  psychoJS.experiment.removeLoop(round5);

  return Scheduler.Event.NEXT;
}


async function loop5LoopEnd() {
  psychoJS.experiment.removeLoop(loop5);

  return Scheduler.Event.NEXT;
}


var couple_of_examples;
function couple_of_examplesLoopBegin(couple_of_examplesLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    couple_of_examples = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 3, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'couple_of_examples'
    });
    psychoJS.experiment.addLoop(couple_of_examples); // add the loop to the experiment
    currentLoop = couple_of_examples;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    couple_of_examples.forEach(function() {
      const snapshot = couple_of_examples.getSnapshot();
    
      couple_of_examplesLoopScheduler.add(importConditions(snapshot));
      couple_of_examplesLoopScheduler.add(action_prepRoutineBegin(snapshot));
      couple_of_examplesLoopScheduler.add(action_prepRoutineEachFrame());
      couple_of_examplesLoopScheduler.add(action_prepRoutineEnd());
      couple_of_examplesLoopScheduler.add(action_executionRoutineBegin(snapshot));
      couple_of_examplesLoopScheduler.add(action_executionRoutineEachFrame());
      couple_of_examplesLoopScheduler.add(action_executionRoutineEnd());
      couple_of_examplesLoopScheduler.add(endLoopIteration(couple_of_examplesLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function couple_of_examplesLoopEnd() {
  psychoJS.experiment.removeLoop(couple_of_examples);

  return Scheduler.Event.NEXT;
}


var loop6;
function loop6LoopBegin(loop6LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    loop6 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 53, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'loop6'
    });
    psychoJS.experiment.addLoop(loop6); // add the loop to the experiment
    currentLoop = loop6;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    loop6.forEach(function() {
      const snapshot = loop6.getSnapshot();
    
      loop6LoopScheduler.add(importConditions(snapshot));
      const review_sixthLoopScheduler = new Scheduler(psychoJS);
      loop6LoopScheduler.add(review_sixthLoopBegin(review_sixthLoopScheduler, snapshot));
      loop6LoopScheduler.add(review_sixthLoopScheduler);
      loop6LoopScheduler.add(review_sixthLoopEnd);
      const round6LoopScheduler = new Scheduler(psychoJS);
      loop6LoopScheduler.add(round6LoopBegin(round6LoopScheduler, snapshot));
      loop6LoopScheduler.add(round6LoopScheduler);
      loop6LoopScheduler.add(round6LoopEnd);
      loop6LoopScheduler.add(endLoopIteration(loop6LoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


var review_sixth;
function review_sixthLoopBegin(review_sixthLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    review_sixth = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 52, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'review_sixth'
    });
    psychoJS.experiment.addLoop(review_sixth); // add the loop to the experiment
    currentLoop = review_sixth;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    review_sixth.forEach(function() {
      const snapshot = review_sixth.getSnapshot();
    
      review_sixthLoopScheduler.add(importConditions(snapshot));
      review_sixthLoopScheduler.add(review_routesRoutineBegin(snapshot));
      review_sixthLoopScheduler.add(review_routesRoutineEachFrame());
      review_sixthLoopScheduler.add(review_routesRoutineEnd());
      review_sixthLoopScheduler.add(endLoopIteration(review_sixthLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function review_sixthLoopEnd() {
  psychoJS.experiment.removeLoop(review_sixth);

  return Scheduler.Event.NEXT;
}


var round6;
function round6LoopBegin(round6LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    round6 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 3, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'round6'
    });
    psychoJS.experiment.addLoop(round6); // add the loop to the experiment
    currentLoop = round6;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    round6.forEach(function() {
      const snapshot = round6.getSnapshot();
    
      round6LoopScheduler.add(importConditions(snapshot));
      round6LoopScheduler.add(quizRoutineBegin(snapshot));
      round6LoopScheduler.add(quizRoutineEachFrame());
      round6LoopScheduler.add(quizRoutineEnd());
      round6LoopScheduler.add(endLoopIteration(round6LoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function round6LoopEnd() {
  psychoJS.experiment.removeLoop(round6);

  return Scheduler.Event.NEXT;
}


async function loop6LoopEnd() {
  psychoJS.experiment.removeLoop(loop6);

  return Scheduler.Event.NEXT;
}


var platform_examples;
function platform_examplesLoopBegin(platform_examplesLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    platform_examples = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 9, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'platform_examples'
    });
    psychoJS.experiment.addLoop(platform_examples); // add the loop to the experiment
    currentLoop = platform_examples;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    platform_examples.forEach(function() {
      const snapshot = platform_examples.getSnapshot();
    
      platform_examplesLoopScheduler.add(importConditions(snapshot));
      platform_examplesLoopScheduler.add(action_prepRoutineBegin(snapshot));
      platform_examplesLoopScheduler.add(action_prepRoutineEachFrame());
      platform_examplesLoopScheduler.add(action_prepRoutineEnd());
      platform_examplesLoopScheduler.add(action_executionRoutineBegin(snapshot));
      platform_examplesLoopScheduler.add(action_executionRoutineEachFrame());
      platform_examplesLoopScheduler.add(action_executionRoutineEnd());
      platform_examplesLoopScheduler.add(feedbackRoutineBegin(snapshot));
      platform_examplesLoopScheduler.add(feedbackRoutineEachFrame());
      platform_examplesLoopScheduler.add(feedbackRoutineEnd());
      platform_examplesLoopScheduler.add(endLoopIteration(platform_examplesLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function platform_examplesLoopEnd() {
  psychoJS.experiment.removeLoop(platform_examples);

  return Scheduler.Event.NEXT;
}


var loop7;
function loop7LoopBegin(loop7LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    loop7 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 52, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'loop7'
    });
    psychoJS.experiment.addLoop(loop7); // add the loop to the experiment
    currentLoop = loop7;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    loop7.forEach(function() {
      const snapshot = loop7.getSnapshot();
    
      loop7LoopScheduler.add(importConditions(snapshot));
      const review_seventhLoopScheduler = new Scheduler(psychoJS);
      loop7LoopScheduler.add(review_seventhLoopBegin(review_seventhLoopScheduler, snapshot));
      loop7LoopScheduler.add(review_seventhLoopScheduler);
      loop7LoopScheduler.add(review_seventhLoopEnd);
      const round7LoopScheduler = new Scheduler(psychoJS);
      loop7LoopScheduler.add(round7LoopBegin(round7LoopScheduler, snapshot));
      loop7LoopScheduler.add(round7LoopScheduler);
      loop7LoopScheduler.add(round7LoopEnd);
      loop7LoopScheduler.add(endLoopIteration(loop7LoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


var review_seventh;
function review_seventhLoopBegin(review_seventhLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    review_seventh = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 52, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'review_seventh'
    });
    psychoJS.experiment.addLoop(review_seventh); // add the loop to the experiment
    currentLoop = review_seventh;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    review_seventh.forEach(function() {
      const snapshot = review_seventh.getSnapshot();
    
      review_seventhLoopScheduler.add(importConditions(snapshot));
      review_seventhLoopScheduler.add(review_routesRoutineBegin(snapshot));
      review_seventhLoopScheduler.add(review_routesRoutineEachFrame());
      review_seventhLoopScheduler.add(review_routesRoutineEnd());
      review_seventhLoopScheduler.add(endLoopIteration(review_seventhLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function review_seventhLoopEnd() {
  psychoJS.experiment.removeLoop(review_seventh);

  return Scheduler.Event.NEXT;
}


var round7;
function round7LoopBegin(round7LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    round7 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 4, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'round7'
    });
    psychoJS.experiment.addLoop(round7); // add the loop to the experiment
    currentLoop = round7;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    round7.forEach(function() {
      const snapshot = round7.getSnapshot();
    
      round7LoopScheduler.add(importConditions(snapshot));
      round7LoopScheduler.add(quizRoutineBegin(snapshot));
      round7LoopScheduler.add(quizRoutineEachFrame());
      round7LoopScheduler.add(quizRoutineEnd());
      round7LoopScheduler.add(endLoopIteration(round7LoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function round7LoopEnd() {
  psychoJS.experiment.removeLoop(round7);

  return Scheduler.Event.NEXT;
}


async function loop7LoopEnd() {
  psychoJS.experiment.removeLoop(loop7);

  return Scheduler.Event.NEXT;
}


var trials_review;
function trials_reviewLoopBegin(trials_reviewLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials_review = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 100, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'trials_review'
    });
    psychoJS.experiment.addLoop(trials_review); // add the loop to the experiment
    currentLoop = trials_review;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    trials_review.forEach(function() {
      const snapshot = trials_review.getSnapshot();
    
      trials_reviewLoopScheduler.add(importConditions(snapshot));
      trials_reviewLoopScheduler.add(open_questionsRoutineBegin(snapshot));
      trials_reviewLoopScheduler.add(open_questionsRoutineEachFrame());
      trials_reviewLoopScheduler.add(open_questionsRoutineEnd());
      trials_reviewLoopScheduler.add(endLoopIteration(trials_reviewLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function trials_reviewLoopEnd() {
  psychoJS.experiment.removeLoop(trials_review);

  return Scheduler.Event.NEXT;
}


var block;
function blockLoopBegin(blockLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    block = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 10, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'block'
    });
    psychoJS.experiment.addLoop(block); // add the loop to the experiment
    currentLoop = block;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    block.forEach(function() {
      const snapshot = block.getSnapshot();
    
      blockLoopScheduler.add(importConditions(snapshot));
      blockLoopScheduler.add(init_blockRoutineBegin(snapshot));
      blockLoopScheduler.add(init_blockRoutineEachFrame());
      blockLoopScheduler.add(init_blockRoutineEnd());
      const relearn_rulesLoopScheduler = new Scheduler(psychoJS);
      blockLoopScheduler.add(relearn_rulesLoopBegin(relearn_rulesLoopScheduler, snapshot));
      blockLoopScheduler.add(relearn_rulesLoopScheduler);
      blockLoopScheduler.add(relearn_rulesLoopEnd);
      const repeat_quizLoopScheduler = new Scheduler(psychoJS);
      blockLoopScheduler.add(repeat_quizLoopBegin(repeat_quizLoopScheduler, snapshot));
      blockLoopScheduler.add(repeat_quizLoopScheduler);
      blockLoopScheduler.add(repeat_quizLoopEnd);
      blockLoopScheduler.add(traveling_to_new_planetRoutineBegin(snapshot));
      blockLoopScheduler.add(traveling_to_new_planetRoutineEachFrame());
      blockLoopScheduler.add(traveling_to_new_planetRoutineEnd());
      const trials_taskLoopScheduler = new Scheduler(psychoJS);
      blockLoopScheduler.add(trials_taskLoopBegin(trials_taskLoopScheduler, snapshot));
      blockLoopScheduler.add(trials_taskLoopScheduler);
      blockLoopScheduler.add(trials_taskLoopEnd);
      blockLoopScheduler.add(num_tickets_queryRoutineBegin(snapshot));
      blockLoopScheduler.add(num_tickets_queryRoutineEachFrame());
      blockLoopScheduler.add(num_tickets_queryRoutineEnd());
      blockLoopScheduler.add(breather_2RoutineBegin(snapshot));
      blockLoopScheduler.add(breather_2RoutineEachFrame());
      blockLoopScheduler.add(breather_2RoutineEnd());
      blockLoopScheduler.add(endLoopIteration(blockLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


var relearn_rules;
function relearn_rulesLoopBegin(relearn_rulesLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    relearn_rules = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 3, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'relearn_rules'
    });
    psychoJS.experiment.addLoop(relearn_rules); // add the loop to the experiment
    currentLoop = relearn_rules;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    relearn_rules.forEach(function() {
      const snapshot = relearn_rules.getSnapshot();
    
      relearn_rulesLoopScheduler.add(importConditions(snapshot));
      const review_loop_1LoopScheduler = new Scheduler(psychoJS);
      relearn_rulesLoopScheduler.add(review_loop_1LoopBegin(review_loop_1LoopScheduler, snapshot));
      relearn_rulesLoopScheduler.add(review_loop_1LoopScheduler);
      relearn_rulesLoopScheduler.add(review_loop_1LoopEnd);
      const act_testingLoopScheduler = new Scheduler(psychoJS);
      relearn_rulesLoopScheduler.add(act_testingLoopBegin(act_testingLoopScheduler, snapshot));
      relearn_rulesLoopScheduler.add(act_testingLoopScheduler);
      relearn_rulesLoopScheduler.add(act_testingLoopEnd);
      relearn_rulesLoopScheduler.add(endLoopIteration(relearn_rulesLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


var review_loop_1;
function review_loop_1LoopBegin(review_loop_1LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    review_loop_1 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 30, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'review_loop_1'
    });
    psychoJS.experiment.addLoop(review_loop_1); // add the loop to the experiment
    currentLoop = review_loop_1;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    review_loop_1.forEach(function() {
      const snapshot = review_loop_1.getSnapshot();
    
      review_loop_1LoopScheduler.add(importConditions(snapshot));
      review_loop_1LoopScheduler.add(review_routesRoutineBegin(snapshot));
      review_loop_1LoopScheduler.add(review_routesRoutineEachFrame());
      review_loop_1LoopScheduler.add(review_routesRoutineEnd());
      review_loop_1LoopScheduler.add(endLoopIteration(review_loop_1LoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function review_loop_1LoopEnd() {
  psychoJS.experiment.removeLoop(review_loop_1);

  return Scheduler.Event.NEXT;
}


var act_testing;
function act_testingLoopBegin(act_testingLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    act_testing = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 4, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'act_testing'
    });
    psychoJS.experiment.addLoop(act_testing); // add the loop to the experiment
    currentLoop = act_testing;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    act_testing.forEach(function() {
      const snapshot = act_testing.getSnapshot();
    
      act_testingLoopScheduler.add(importConditions(snapshot));
      act_testingLoopScheduler.add(quizRoutineBegin(snapshot));
      act_testingLoopScheduler.add(quizRoutineEachFrame());
      act_testingLoopScheduler.add(quizRoutineEnd());
      act_testingLoopScheduler.add(endLoopIteration(act_testingLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function act_testingLoopEnd() {
  psychoJS.experiment.removeLoop(act_testing);

  return Scheduler.Event.NEXT;
}


async function relearn_rulesLoopEnd() {
  psychoJS.experiment.removeLoop(relearn_rules);

  return Scheduler.Event.NEXT;
}


var repeat_quiz;
function repeat_quizLoopBegin(repeat_quizLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    repeat_quiz = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 3, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'repeat_quiz'
    });
    psychoJS.experiment.addLoop(repeat_quiz); // add the loop to the experiment
    currentLoop = repeat_quiz;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    repeat_quiz.forEach(function() {
      const snapshot = repeat_quiz.getSnapshot();
    
      repeat_quizLoopScheduler.add(importConditions(snapshot));
      const practice_taskLoopScheduler = new Scheduler(psychoJS);
      repeat_quizLoopScheduler.add(practice_taskLoopBegin(practice_taskLoopScheduler, snapshot));
      repeat_quizLoopScheduler.add(practice_taskLoopScheduler);
      repeat_quizLoopScheduler.add(practice_taskLoopEnd);
      const practice_quizLoopScheduler = new Scheduler(psychoJS);
      repeat_quizLoopScheduler.add(practice_quizLoopBegin(practice_quizLoopScheduler, snapshot));
      repeat_quizLoopScheduler.add(practice_quizLoopScheduler);
      repeat_quizLoopScheduler.add(practice_quizLoopEnd);
      repeat_quizLoopScheduler.add(endLoopIteration(repeat_quizLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


var practice_task;
function practice_taskLoopBegin(practice_taskLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    practice_task = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 25, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'practice_task'
    });
    psychoJS.experiment.addLoop(practice_task); // add the loop to the experiment
    currentLoop = practice_task;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    practice_task.forEach(function() {
      const snapshot = practice_task.getSnapshot();
    
      practice_taskLoopScheduler.add(importConditions(snapshot));
      practice_taskLoopScheduler.add(practice_in_taskRoutineBegin(snapshot));
      practice_taskLoopScheduler.add(practice_in_taskRoutineEachFrame());
      practice_taskLoopScheduler.add(practice_in_taskRoutineEnd());
      practice_taskLoopScheduler.add(endLoopIteration(practice_taskLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function practice_taskLoopEnd() {
  psychoJS.experiment.removeLoop(practice_task);

  return Scheduler.Event.NEXT;
}


var practice_quiz;
function practice_quizLoopBegin(practice_quizLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    practice_quiz = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 4, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'practice_quiz'
    });
    psychoJS.experiment.addLoop(practice_quiz); // add the loop to the experiment
    currentLoop = practice_quiz;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    practice_quiz.forEach(function() {
      const snapshot = practice_quiz.getSnapshot();
    
      practice_quizLoopScheduler.add(importConditions(snapshot));
      practice_quizLoopScheduler.add(check_action_understandingRoutineBegin(snapshot));
      practice_quizLoopScheduler.add(check_action_understandingRoutineEachFrame());
      practice_quizLoopScheduler.add(check_action_understandingRoutineEnd());
      practice_quizLoopScheduler.add(endLoopIteration(practice_quizLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function practice_quizLoopEnd() {
  psychoJS.experiment.removeLoop(practice_quiz);

  return Scheduler.Event.NEXT;
}


async function repeat_quizLoopEnd() {
  psychoJS.experiment.removeLoop(repeat_quiz);

  return Scheduler.Event.NEXT;
}


var trials_task;
function trials_taskLoopBegin(trials_taskLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials_task = new TrialHandler({
      psychoJS: psychoJS,
      nReps: trial_length, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'trials_task'
    });
    psychoJS.experiment.addLoop(trials_task); // add the loop to the experiment
    currentLoop = trials_task;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    trials_task.forEach(function() {
      const snapshot = trials_task.getSnapshot();
    
      trials_taskLoopScheduler.add(importConditions(snapshot));
      trials_taskLoopScheduler.add(one_or_three_2RoutineBegin(snapshot));
      trials_taskLoopScheduler.add(one_or_three_2RoutineEachFrame());
      trials_taskLoopScheduler.add(one_or_three_2RoutineEnd());
      const sreview_insLoopScheduler = new Scheduler(psychoJS);
      trials_taskLoopScheduler.add(sreview_insLoopBegin(sreview_insLoopScheduler, snapshot));
      trials_taskLoopScheduler.add(sreview_insLoopScheduler);
      trials_taskLoopScheduler.add(sreview_insLoopEnd);
      trials_taskLoopScheduler.add(make_choiceRoutineBegin(snapshot));
      trials_taskLoopScheduler.add(make_choiceRoutineEachFrame());
      trials_taskLoopScheduler.add(make_choiceRoutineEnd());
      trials_taskLoopScheduler.add(show_choiceRoutineBegin(snapshot));
      trials_taskLoopScheduler.add(show_choiceRoutineEachFrame());
      trials_taskLoopScheduler.add(show_choiceRoutineEnd());
      trials_taskLoopScheduler.add(ok_wait_2RoutineBegin(snapshot));
      trials_taskLoopScheduler.add(ok_wait_2RoutineEachFrame());
      trials_taskLoopScheduler.add(ok_wait_2RoutineEnd());
      const retryLoopScheduler = new Scheduler(psychoJS);
      trials_taskLoopScheduler.add(retryLoopBegin(retryLoopScheduler, snapshot));
      trials_taskLoopScheduler.add(retryLoopScheduler);
      trials_taskLoopScheduler.add(retryLoopEnd);
      trials_taskLoopScheduler.add(timedOUTRoutineBegin(snapshot));
      trials_taskLoopScheduler.add(timedOUTRoutineEachFrame());
      trials_taskLoopScheduler.add(timedOUTRoutineEnd());
      trials_taskLoopScheduler.add(feedback_2RoutineBegin(snapshot));
      trials_taskLoopScheduler.add(feedback_2RoutineEachFrame());
      trials_taskLoopScheduler.add(feedback_2RoutineEnd());
      trials_taskLoopScheduler.add(excitedRoutineBegin(snapshot));
      trials_taskLoopScheduler.add(excitedRoutineEachFrame());
      trials_taskLoopScheduler.add(excitedRoutineEnd());
      trials_taskLoopScheduler.add(contentRoutineBegin(snapshot));
      trials_taskLoopScheduler.add(contentRoutineEachFrame());
      trials_taskLoopScheduler.add(contentRoutineEnd());
      trials_taskLoopScheduler.add(endLoopIteration(trials_taskLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


var sreview_ins;
function sreview_insLoopBegin(sreview_insLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    sreview_ins = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 10, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'sreview_ins'
    });
    psychoJS.experiment.addLoop(sreview_ins); // add the loop to the experiment
    currentLoop = sreview_ins;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    sreview_ins.forEach(function() {
      const snapshot = sreview_ins.getSnapshot();
    
      sreview_insLoopScheduler.add(importConditions(snapshot));
      sreview_insLoopScheduler.add(opt_in_choice_3RoutineBegin(snapshot));
      sreview_insLoopScheduler.add(opt_in_choice_3RoutineEachFrame());
      sreview_insLoopScheduler.add(opt_in_choice_3RoutineEnd());
      sreview_insLoopScheduler.add(timedOut_LostRoutineBegin(snapshot));
      sreview_insLoopScheduler.add(timedOut_LostRoutineEachFrame());
      sreview_insLoopScheduler.add(timedOut_LostRoutineEnd());
      sreview_insLoopScheduler.add(endLoopIteration(sreview_insLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function sreview_insLoopEnd() {
  psychoJS.experiment.removeLoop(sreview_ins);

  return Scheduler.Event.NEXT;
}


var retry;
function retryLoopBegin(retryLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    retry = new TrialHandler({
      psychoJS: psychoJS,
      nReps: retry_loop, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'retry'
    });
    psychoJS.experiment.addLoop(retry); // add the loop to the experiment
    currentLoop = retry;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    retry.forEach(function() {
      const snapshot = retry.getSnapshot();
    
      retryLoopScheduler.add(importConditions(snapshot));
      retryLoopScheduler.add(action_prep_2RoutineBegin(snapshot));
      retryLoopScheduler.add(action_prep_2RoutineEachFrame());
      retryLoopScheduler.add(action_prep_2RoutineEnd());
      retryLoopScheduler.add(action_execRoutineBegin(snapshot));
      retryLoopScheduler.add(action_execRoutineEachFrame());
      retryLoopScheduler.add(action_execRoutineEnd());
      retryLoopScheduler.add(try_again_2RoutineBegin(snapshot));
      retryLoopScheduler.add(try_again_2RoutineEachFrame());
      retryLoopScheduler.add(try_again_2RoutineEnd());
      retryLoopScheduler.add(ok_waitRoutineBegin(snapshot));
      retryLoopScheduler.add(ok_waitRoutineEachFrame());
      retryLoopScheduler.add(ok_waitRoutineEnd());
      retryLoopScheduler.add(endLoopIteration(retryLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function retryLoopEnd() {
  psychoJS.experiment.removeLoop(retry);

  return Scheduler.Event.NEXT;
}


async function trials_taskLoopEnd() {
  psychoJS.experiment.removeLoop(trials_task);

  return Scheduler.Event.NEXT;
}


async function blockLoopEnd() {
  psychoJS.experiment.removeLoop(block);

  return Scheduler.Event.NEXT;
}


var trials_2;
function trials_2LoopBegin(trials_2LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials_2 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 6, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'trials_2'
    });
    psychoJS.experiment.addLoop(trials_2); // add the loop to the experiment
    currentLoop = trials_2;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    trials_2.forEach(function() {
      const snapshot = trials_2.getSnapshot();
    
      trials_2LoopScheduler.add(importConditions(snapshot));
      trials_2LoopScheduler.add(risk_choices_2RoutineBegin(snapshot));
      trials_2LoopScheduler.add(risk_choices_2RoutineEachFrame());
      trials_2LoopScheduler.add(risk_choices_2RoutineEnd());
      trials_2LoopScheduler.add(gamblingoutcomeRoutineBegin(snapshot));
      trials_2LoopScheduler.add(gamblingoutcomeRoutineEachFrame());
      trials_2LoopScheduler.add(gamblingoutcomeRoutineEnd());
      trials_2LoopScheduler.add(gamble_outcomeRoutineBegin(snapshot));
      trials_2LoopScheduler.add(gamble_outcomeRoutineEachFrame());
      trials_2LoopScheduler.add(gamble_outcomeRoutineEnd());
      trials_2LoopScheduler.add(endLoopIteration(trials_2LoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function trials_2LoopEnd() {
  psychoJS.experiment.removeLoop(trials_2);

  return Scheduler.Event.NEXT;
}


var need_feedback;
function need_feedbackLoopBegin(need_feedbackLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    need_feedback = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 100, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: undefined,
      seed: undefined, name: 'need_feedback'
    });
    psychoJS.experiment.addLoop(need_feedback); // add the loop to the experiment
    currentLoop = need_feedback;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    need_feedback.forEach(function() {
      const snapshot = need_feedback.getSnapshot();
    
      need_feedbackLoopScheduler.add(importConditions(snapshot));
      need_feedbackLoopScheduler.add(open_questions_2RoutineBegin(snapshot));
      need_feedbackLoopScheduler.add(open_questions_2RoutineEachFrame());
      need_feedbackLoopScheduler.add(open_questions_2RoutineEnd());
      need_feedbackLoopScheduler.add(endLoopIteration(need_feedbackLoopScheduler, snapshot));
    });
    
    return Scheduler.Event.NEXT;
  }
}


async function need_feedbackLoopEnd() {
  psychoJS.experiment.removeLoop(need_feedback);

  return Scheduler.Event.NEXT;
}


var test_1;
var c_inelastic;
var c_elastic;
var _key_resp_11_allKeys;
var consent_form_1Components;
function consent_form_1RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'consent_form_1'-------
    t = 0;
    consent_form_1Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    consent.alignHoriz = "left";
    test_1 = "INFORMED CONSENT\n\nWho is conducting this research study?\n\nThis research is being conducted by the Psychology and Cognitive Sciences Departments at the Hebrew University of Jerusalem. The lead researchers for this project are Levi Solomyak and Aviv Emanuel.\n\nWhat is the purpose of this study?\n\nWe are interested in understanding how individual differences in learning and decision making contribute to psychological traits. Particularly, in the current study, we focus on how people learn about the effect of their actions. This research aims to provide an insight into how healthy brain works, to help us better understand how aberrant learning might contribute to clinical presentation of specific psychological disorders.\n\n Who can participate in the study?\n\nOnly adults (age 18 and above) who are native or fluent in English are eligible to participate. Because the study has numerous psychological surveys to fill, it is important that English is a language that you are fluent in. \n\nPress Space to continue";
    console.log(("part_id is" + part_id.toString()));
    c_inelastic = datasub[((part_id * 3) - 3)]["c_inelastic"];
    c_elastic = datasub[((part_id * 3) - 3)]["c_elastic"];
    
    consent.setText(test_1);
    key_resp_11.keys = undefined;
    key_resp_11.rt = undefined;
    _key_resp_11_allKeys = [];
    text_9.setText(("c_inelastic" + c_inelastic.toString()));
    text_12.setText(("c elastic is" + c_elastic.toString()));
    // keep track of which components have finished
    consent_form_1Components = [];
    consent_form_1Components.push(consent);
    consent_form_1Components.push(key_resp_11);
    consent_form_1Components.push(text_9);
    consent_form_1Components.push(text_12);
    
    consent_form_1Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function consent_form_1RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'consent_form_1'-------
    // get current time
    t = consent_form_1Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *consent* updates
    if (t >= 0.0 && consent.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      consent.tStart = t;  // (not accounting for frame time here)
      consent.frameNStart = frameN;  // exact frame index
      
      consent.setAutoDraw(true);
    }

    
    // *key_resp_11* updates
    if (t >= 0.0 && key_resp_11.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_11.tStart = t;  // (not accounting for frame time here)
      key_resp_11.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_11.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_11.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_11.clearEvents(); });
    }

    if (key_resp_11.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_11.getKeys({keyList: ['space'], waitRelease: false});
      _key_resp_11_allKeys = _key_resp_11_allKeys.concat(theseKeys);
      if (_key_resp_11_allKeys.length > 0) {
        key_resp_11.keys = _key_resp_11_allKeys[_key_resp_11_allKeys.length - 1].name;  // just the last key pressed
        key_resp_11.rt = _key_resp_11_allKeys[_key_resp_11_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *text_9* updates
    if (t >= 0.0 && text_9.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_9.tStart = t;  // (not accounting for frame time here)
      text_9.frameNStart = frameN;  // exact frame index
      
      text_9.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_9.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_9.setAutoDraw(false);
    }
    
    // *text_12* updates
    if (t >= 0.0 && text_12.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_12.tStart = t;  // (not accounting for frame time here)
      text_12.frameNStart = frameN;  // exact frame index
      
      text_12.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_12.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_12.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    consent_form_1Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function consent_form_1RoutineEnd() {
  return async function () {
    //------Ending Routine 'consent_form_1'-------
    consent_form_1Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(key_resp_11.corr, level);
    }
    psychoJS.experiment.addData('key_resp_11.keys', key_resp_11.keys);
    if (typeof key_resp_11.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_11.rt', key_resp_11.rt);
        routineTimer.reset();
        }
    
    key_resp_11.stop();
    // the Routine "consent_form_1" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _key_resp_14_allKeys;
var consent_form_2Components;
function consent_form_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'consent_form_2'-------
    t = 0;
    consent_form_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    text_24.alignHoriz = "left";
    
    key_resp_14.keys = undefined;
    key_resp_14.rt = undefined;
    _key_resp_14_allKeys = [];
    // keep track of which components have finished
    consent_form_2Components = [];
    consent_form_2Components.push(text_24);
    consent_form_2Components.push(key_resp_14);
    
    consent_form_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function consent_form_2RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'consent_form_2'-------
    // get current time
    t = consent_form_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_24* updates
    if (t >= 0.0 && text_24.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_24.tStart = t;  // (not accounting for frame time here)
      text_24.frameNStart = frameN;  // exact frame index
      
      text_24.setAutoDraw(true);
    }

    
    // *key_resp_14* updates
    if (t >= 0.0 && key_resp_14.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_14.tStart = t;  // (not accounting for frame time here)
      key_resp_14.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_14.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_14.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_14.clearEvents(); });
    }

    if (key_resp_14.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_14.getKeys({keyList: ['space'], waitRelease: false});
      _key_resp_14_allKeys = _key_resp_14_allKeys.concat(theseKeys);
      if (_key_resp_14_allKeys.length > 0) {
        key_resp_14.keys = _key_resp_14_allKeys[_key_resp_14_allKeys.length - 1].name;  // just the last key pressed
        key_resp_14.rt = _key_resp_14_allKeys[_key_resp_14_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    consent_form_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function consent_form_2RoutineEnd() {
  return async function () {
    //------Ending Routine 'consent_form_2'-------
    consent_form_2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(key_resp_14.corr, level);
    }
    psychoJS.experiment.addData('key_resp_14.keys', key_resp_14.keys);
    if (typeof key_resp_14.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_14.rt', key_resp_14.rt);
        routineTimer.reset();
        }
    
    key_resp_14.stop();
    // the Routine "consent_form_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _key_resp_17_allKeys;
var consent_form_3Components;
function consent_form_3RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'consent_form_3'-------
    t = 0;
    consent_form_3Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    text_25.alignHoriz = "left";
    
    key_resp_17.keys = undefined;
    key_resp_17.rt = undefined;
    _key_resp_17_allKeys = [];
    // keep track of which components have finished
    consent_form_3Components = [];
    consent_form_3Components.push(text_25);
    consent_form_3Components.push(key_resp_17);
    
    consent_form_3Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function consent_form_3RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'consent_form_3'-------
    // get current time
    t = consent_form_3Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_25* updates
    if (t >= 0.0 && text_25.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_25.tStart = t;  // (not accounting for frame time here)
      text_25.frameNStart = frameN;  // exact frame index
      
      text_25.setAutoDraw(true);
    }

    
    // *key_resp_17* updates
    if (t >= 0.0 && key_resp_17.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_17.tStart = t;  // (not accounting for frame time here)
      key_resp_17.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_17.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_17.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_17.clearEvents(); });
    }

    if (key_resp_17.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_17.getKeys({keyList: ['space'], waitRelease: false});
      _key_resp_17_allKeys = _key_resp_17_allKeys.concat(theseKeys);
      if (_key_resp_17_allKeys.length > 0) {
        key_resp_17.keys = _key_resp_17_allKeys[_key_resp_17_allKeys.length - 1].name;  // just the last key pressed
        key_resp_17.rt = _key_resp_17_allKeys[_key_resp_17_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    consent_form_3Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function consent_form_3RoutineEnd() {
  return async function () {
    //------Ending Routine 'consent_form_3'-------
    consent_form_3Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(key_resp_17.corr, level);
    }
    psychoJS.experiment.addData('key_resp_17.keys', key_resp_17.keys);
    if (typeof key_resp_17.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_17.rt', key_resp_17.rt);
        routineTimer.reset();
        }
    
    key_resp_17.stop();
    // the Routine "consent_form_3" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _key_resp_12_allKeys;
var consent_form_4Components;
function consent_form_4RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'consent_form_4'-------
    t = 0;
    consent_form_4Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    text_22.alignHoriz = "left";
    
    key_resp_12.keys = undefined;
    key_resp_12.rt = undefined;
    _key_resp_12_allKeys = [];
    // keep track of which components have finished
    consent_form_4Components = [];
    consent_form_4Components.push(text_22);
    consent_form_4Components.push(key_resp_12);
    
    consent_form_4Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function consent_form_4RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'consent_form_4'-------
    // get current time
    t = consent_form_4Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_22* updates
    if (t >= 0.0 && text_22.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_22.tStart = t;  // (not accounting for frame time here)
      text_22.frameNStart = frameN;  // exact frame index
      
      text_22.setAutoDraw(true);
    }

    
    // *key_resp_12* updates
    if (t >= 0.0 && key_resp_12.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_12.tStart = t;  // (not accounting for frame time here)
      key_resp_12.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_12.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_12.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_12.clearEvents(); });
    }

    if (key_resp_12.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_12.getKeys({keyList: ['y', 'n'], waitRelease: false});
      _key_resp_12_allKeys = _key_resp_12_allKeys.concat(theseKeys);
      if (_key_resp_12_allKeys.length > 0) {
        key_resp_12.keys = _key_resp_12_allKeys[_key_resp_12_allKeys.length - 1].name;  // just the last key pressed
        key_resp_12.rt = _key_resp_12_allKeys[_key_resp_12_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    consent_form_4Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function consent_form_4RoutineEnd() {
  return async function () {
    //------Ending Routine 'consent_form_4'-------
    consent_form_4Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(key_resp_12.corr, level);
    }
    psychoJS.experiment.addData('key_resp_12.keys', key_resp_12.keys);
    if (typeof key_resp_12.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_12.rt', key_resp_12.rt);
        routineTimer.reset();
        }
    
    key_resp_12.stop();
    if ((key_resp_12.keys === "y")) {
        consent_loop.finished = true;
    } 
    
    // the Routine "consent_form_4" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var text_consent;
var _key_resp_19_allKeys;
var consent_5Components;
function consent_5RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'consent_5'-------
    t = 0;
    consent_5Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    if ((key_resp_11.keys === "n")) {
        text_consent = "Are you sure you do not wish to participate in this study?\n\nIf so, as you do not wish to participate in this study, please return your submission on Prolific by selecting the \"Stop without completing\" button.\"\n\nPress n to confirm\nPress r to return to re-read the consent form";
    } else {
        text_consent = "Great! Then let us set off\n on an intergalactic adventure!\n\n Press r when you are ready";
    }
    text_23.alignHoriz = "left";
    
    text_23.setText(text_consent);
    key_resp_19.keys = undefined;
    key_resp_19.rt = undefined;
    _key_resp_19_allKeys = [];
    // keep track of which components have finished
    consent_5Components = [];
    consent_5Components.push(text_23);
    consent_5Components.push(key_resp_19);
    
    consent_5Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function consent_5RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'consent_5'-------
    // get current time
    t = consent_5Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_23* updates
    if (t >= 0.0 && text_23.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_23.tStart = t;  // (not accounting for frame time here)
      text_23.frameNStart = frameN;  // exact frame index
      
      text_23.setAutoDraw(true);
    }

    
    // *key_resp_19* updates
    if (t >= 0.0 && key_resp_19.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_19.tStart = t;  // (not accounting for frame time here)
      key_resp_19.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_19.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_19.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_19.clearEvents(); });
    }

    if (key_resp_19.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_19.getKeys({keyList: ['n', 'r'], waitRelease: false});
      _key_resp_19_allKeys = _key_resp_19_allKeys.concat(theseKeys);
      if (_key_resp_19_allKeys.length > 0) {
        key_resp_19.keys = _key_resp_19_allKeys[_key_resp_19_allKeys.length - 1].name;  // just the last key pressed
        key_resp_19.rt = _key_resp_19_allKeys[_key_resp_19_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    consent_5Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function consent_5RoutineEnd() {
  return async function () {
    //------Ending Routine 'consent_5'-------
    consent_5Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    if ((key_resp_19.keys === "n")) {
        psychoJS.quit({message: 'As you do not wish to participate in this study, please return your submission on Prolific by selecting the "Stop without completing" button.'}); 
    }
    
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(key_resp_19.corr, level);
    }
    psychoJS.experiment.addData('key_resp_19.keys', key_resp_19.keys);
    if (typeof key_resp_19.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_19.rt', key_resp_19.rt);
        routineTimer.reset();
        }
    
    key_resp_19.stop();
    // the Routine "consent_5" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _key_resp_first_3_allKeys;
var review_routesComponents;
function review_routesRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'review_routes'-------
    t = 0;
    review_routesClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    if ((before_task === true)) {
        if ((set_of_instructions === 1)) {
            if ((review_first.thisN === 0)) {
                slide_review = 1;
            }
            if (((key_resp_first_3.keys === "right") && (slide_review < 4))) {
                slide_review += 1;
            } else {
                if (((key_resp_first_3.keys === "left") && (slide_review > 1))) {
                    slide_review -= 1;
                }
            }
        } else {
            if ((set_of_instructions === 2)) {
                if ((review_second.thisN === 0)) {
                    slide_review = 4;
                }
                if (((key_resp_first_3.keys === "right") && (slide_review < 7))) {
                    slide_review += 1;
                }
                if (((key_resp_first_3.keys === "left") && (slide_review > 5))) {
                    slide_review -= 1;
                }
            } else {
                if ((set_of_instructions === 3)) {
                    if ((review_third.thisN === 0)) {
                        slide_review = 7;
                    }
                    if (((key_resp_first_3.keys === "right") && (slide_review < 12))) {
                        slide_review += 1;
                    }
                    if (((key_resp_first_3.keys === "left") && (slide_review > 8))) {
                        slide_review -= 1;
                    }
                } else {
                    if ((set_of_instructions === 4)) {
                        if ((review_fourth.thisN === 0)) {
                            slide_review = 12;
                        }
                        if (((key_resp_first_3.keys === "right") && (slide_review < 18))) {
                            slide_review += 1;
                        }
                        if (((key_resp_first_3.keys === "left") && (slide_review > 13))) {
                            slide_review -= 1;
                        }
                    } else {
                        if ((set_of_instructions === 5)) {
                            if ((review_fifth.thisN === 0)) {
                                slide_review = 18;
                            }
                            if (((key_resp_first_3.keys === "right") && (slide_review < 23))) {
                                slide_review += 1;
                            }
                            if (((key_resp_first_3.keys === "left") && (slide_review > 19))) {
                                slide_review -= 1;
                            }
                        } else {
                            if ((set_of_instructions === 6)) {
                                set_actions = 2;
                                if ((review_sixth.thisN === 0)) {
                                    slide_review = 23;
                                }
                                if (((key_resp_first_3.keys === "right") && (slide_review < 27))) {
                                    slide_review += 1;
                                }
                                if (((key_resp_first_3.keys === "left") && (slide_review > 23))) {
                                    slide_review -= 1;
                                }
                            } else {
                                if ((set_of_instructions === 7)) {
                                    if ((review_seventh.thisN === 0)) {
                                        slide_review = 28;
                                    }
                                    if (((key_resp_first_3.keys === "right") && (slide_review < 39))) {
                                        slide_review += 1;
                                    }
                                    if (((key_resp_first_3.keys === "left") && (slide_review > 29))) {
                                        slide_review -= 1;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        if ((in_task === true)) {
            if ((block.thisN === 3)) {
                continueRoutine = true;
            } else {
                continueRoutine = false;
            }
            if ((review_loop_1.thisN === 0)) {
                slide_review = 40;
            }
            if (((key_resp_first_3.keys === "right") && (slide_review < 49))) {
                slide_review += 1;
            } else {
                if (((key_resp_first_3.keys === "left") && (slide_review > 40))) {
                    slide_review -= 1;
                }
            }
        }
    }
    
    key_resp_first_3.keys = undefined;
    key_resp_first_3.rt = undefined;
    _key_resp_first_3_allKeys = [];
    image_6.setImage((("instr_new_draft/Slide" + slide_review.toString()) + ".jpeg"));
    // keep track of which components have finished
    review_routesComponents = [];
    review_routesComponents.push(key_resp_first_3);
    review_routesComponents.push(image_6);
    
    review_routesComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function review_routesRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'review_routes'-------
    // get current time
    t = review_routesClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *key_resp_first_3* updates
    if (t >= 0.0 && key_resp_first_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_first_3.tStart = t;  // (not accounting for frame time here)
      key_resp_first_3.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_first_3.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_first_3.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_first_3.clearEvents(); });
    }

    if (key_resp_first_3.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_first_3.getKeys({keyList: ['left', 'right'], waitRelease: false});
      _key_resp_first_3_allKeys = _key_resp_first_3_allKeys.concat(theseKeys);
      if (_key_resp_first_3_allKeys.length > 0) {
        key_resp_first_3.keys = _key_resp_first_3_allKeys[_key_resp_first_3_allKeys.length - 1].name;  // just the last key pressed
        key_resp_first_3.rt = _key_resp_first_3_allKeys[_key_resp_first_3_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *image_6* updates
    if (t >= 0.0 && image_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      image_6.tStart = t;  // (not accounting for frame time here)
      image_6.frameNStart = frameN;  // exact frame index
      
      image_6.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    review_routesComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function review_routesRoutineEnd() {
  return async function () {
    //------Ending Routine 'review_routes'-------
    review_routesComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    if ((before_task === true)) {
        if ((set_of_instructions === 1)) {
            if (((slide_review === 4) && (key_resp_first_3.keys === "right"))) {
                slide_review += 1;
                review_first.finished = true;
                console.log("set of instructions before quiz");
                set_of_instructions += 1;
                continueRoutine = false;
            }
        } else {
            if ((set_of_instructions === 2)) {
                if (((slide_review === 7) && (key_resp_first_3.keys === "right"))) {
                    slide_review += 1;
                    review_second.finished = true;
                    set_of_instructions += 1;
                    continueRoutine = false;
                }
            } else {
                if ((set_of_instructions === 3)) {
                    if (((slide_review === 12) && (key_resp_first_3.keys === "right"))) {
                        slide_review += 1;
                        review_third.finished = true;
                        set_of_instructions += 1;
                        continueRoutine = false;
                    }
                } else {
                    if ((set_of_instructions === 4)) {
                        if (((slide_review === 18) && (key_resp_first_3.keys === "right"))) {
                            slide_review += 1;
                            review_fourth.finished = true;
                            set_of_instructions += 1;
                            continueRoutine = false;
                        }
                    } else {
                        if ((set_of_instructions === 5)) {
                            if (((slide_review === 23) && (key_resp_first_3.keys === "right"))) {
                                slide_review += 1;
                                review_fifth.finished = true;
                                set_of_instructions += 1;
                                continueRoutine = false;
                            }
                        } else {
                            if ((set_of_instructions === 6)) {
                                if (((slide_review === 27) && (key_resp_first_3.keys === "right"))) {
                                    slide_review += 1;
                                    review_sixth.finished = true;
                                    set_of_instructions += 1;
                                    continueRoutine = false;
                                }
                            } else {
                                if ((set_of_instructions === 7)) {
                                    if (((slide_review === 39) && (key_resp_first_3.keys === "right"))) {
                                        slide_review += 1;
                                        review_seventh.finished = true;
                                        set_of_instructions += 1;
                                        continueRoutine = false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if ((in_task === true)) {
        if (((slide_review === 49) && (key_resp_first_3.keys === "right"))) {
            review_loop_1.finished = true;
            continueRoutine = false;
        }
    }
    
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(key_resp_first_3.corr, level);
    }
    psychoJS.experiment.addData('key_resp_first_3.keys', key_resp_first_3.keys);
    if (typeof key_resp_first_3.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_first_3.rt', key_resp_first_3.rt);
        routineTimer.reset();
        }
    
    key_resp_first_3.stop();
    // the Routine "review_routes" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var texts;
var text_to_show;
var _quiz_answer_allKeys;
var quizComponents;
function quizRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'quiz'-------
    t = 0;
    quizClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    if ((num_wrong < 4)) {
        texts = "note- too many failures on the quizzes will result in not being able to proceed with the study";
    } else {
        texts = "WARNING- you have already failed a number of quizzes. More mistakes will risk you being kicked out of the study. Plase read the slides carefully and review them as necessaty.";
    }
    if ((before_task === true)) {
        if ((quiz_set === 1)) {
            test_q.alignHoriz = "left";
            if ((round1.thisN === 0)) {
                text_to_show = "Quiz: At the top of the screen is:\n\na) Current location\nb) Location with the treasure";
            } else {
                if ((round1.thisN === 1)) {
                    text_to_show = "Quiz: At the bottom of the screen is:\n\na) Current location\nb) teasure location";
                } else {
                    if ((round1.thisN === 2)) {
                        text_to_show = "Quiz: True/False   The coins I find in the treasure will have no effect on my bonus payment at the end of the experiment\n\na) True\nb) False";
                    } else {
                        if ((round1.thisN === 3)) {
                            if ((cor_first >= 3)) {
                                text_to_show = "Nice job! You are on a roll.\n\n Press space to continue";
                            } else {
                                text_to_show = "Sorry something seems to be unclear to you.\nWe are going to review the instructions/tips one more time.\n\nPress space to continue";
                            }
                        }
                    }
                }
            }
        } else {
            if ((quiz_set === 2)) {
                test_q.alignHoriz = "left";
                if ((round2.thisN === 0)) {
                    cor_first = 0;
                    text_to_show = "Quiz: If you walk from the fountain you end up at (hint- it rhymes) :\n\na) The mountain\nb) The town";
                } else {
                    if ((round2.thisN === 1)) {
                        text_to_show = "Quiz: If you walk from the desert you end up at:\n\na) The mountain\nb) The town";
                    } else {
                        if ((round2.thisN === 2)) {
                            if ((cor_first === 2)) {
                                text_to_show = "Nice job! You are on a roll.\n\n Press space to continue";
                            } else {
                                text_to_show = "Sorry something seems to be unclear to you.\nWe are going to review the instructions/tips one more time.\n\nPress space to continue";
                            }
                        }
                    }
                }
            } else {
                if ((quiz_set === 3)) {
                    test_q.alignHoriz = "left";
                    if ((round3.thisN === 0)) {
                        cor_first = 0;
                        text_to_show = "Quiz: Purchasing a ticket :\n\na) Allows you to select a vehicle (plane/train) based on where the treasure is found\nb) Allows you to choose where the treasure is\nc) Guarantees you protection from the bandits";
                    } else {
                        if ((round3.thisN === 1)) {
                            text_to_show = "Quiz: The plane always takes you to (hint- its the same color\n\na) The mountain\nb) The town";
                        } else {
                            if ((round3.thisN === 2)) {
                                text_to_show = "Quiz: True/False   Where the plane/train go to depends on where you set off from\n\na) True\nb) False";
                            } else {
                                if ((round3.thisN === 3)) {
                                    if ((cor_first === 3)) {
                                        text_to_show = "Nice job! You are on a roll.\n\n Press space to continue";
                                    } else {
                                        text_to_show = "Sorry something seems to be unclear to you.\nWe are going to review the instructions/tips one more time.\n\nPress space to continue";
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if ((quiz_set === 4)) {
                        test_q.alignHoriz = "left";
                        if ((round4.thisN === 0)) {
                            cor_first = 0;
                            text_to_show = "Quiz: True/False   Purchasing a ticket guarantees that the plane/train will stop for you at the station:\n\na) True\nb) False";
                        } else {
                            if ((round4.thisN === 1)) {
                                text_to_show = "Quiz: If you are at the fountain and the train does not stop for you, you will end up\n\na) Walking to the mountain\nb) Walking to the town\nc) Taking the plane to the town\nd) Taking the plane to the mountain";
                            } else {
                                if ((round4.thisN === 2)) {
                                    text_to_show = "Quiz: True/False   On every planet, the frequency with which the plane/train stop for you is the same\n\na) True\nb) False";
                                } else {
                                    if ((round4.thisN === 3)) {
                                        if ((cor_first === 3)) {
                                            text_to_show = "Nice job! You are on a roll.\n\n Press space to continue";
                                        } else {
                                            text_to_show = "Sorry something seems to be unclear to you.\nWe are going to review the instructions/tips one more time.\n\nPress space to continue";
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        if ((quiz_set === 5)) {
                            test_q.alignHoriz = "left";
                            if ((round5.thisN === 0)) {
                                text_to_show = "Quiz: True/False   Purchasing a second ticket to jump on improves my chances of getting on my selected ride in case it does not stop for me \n\na) True\nb) False";
                                cor_first = 0;
                            } else {
                                if ((round5.thisN === 1)) {
                                    text_to_show='Quiz: True/False If I succeed after purchasing two tickets it may be that my ride stopped for me\n\na) True\nb) False'
                                } else {
                                    if ((round5.thisN === 2)) {
                                        if ((cor_first === 2)) {
                                            text_to_show = "Nice job! You are on a roll.\n\n Press space to continue";
                                        } else {
                                            text_to_show = "Sorry something seems to be unclear to you.\nWe are going to review the instructions/tips one more time.\n\nPress space to continue";
                                        }
                                    }
                                }
                            }
                        } else {
                            if ((quiz_set === 6)) {
                                test_q.alignHoriz = "left";
                                if ((round6.thisN === 0)) {
                                    text_to_show = "Quiz: True/False  If I missed my ride I could have still succeeded if I only purchased a single ticket:\n\na) True. When I chose to jump I gave up on the chance of boarding if my vehicle stops\n\nb) False. If I fail to get on it must be that my vehicle stopped for me AND I failed to jump on";
                                    cor_first = 0;
                                } else {
                                    if ((round6.thisN === 1)) {
                                        text_to_show = "Quiz: True/False   Even with a wide platform I should still attempt to press reasonably close to the center\n\na) True. A wide platform doesn't mean I can jump from anywhere. \nb) False. A wide platform means no matter how off I am i'll still get on";
                                    } else {
                                        if ((round6.thisN === 2)) {
                                            if ((cor_first === 2)) {
                                                text_to_show = "Nice job! You are on a roll.\n\n Press space to continue";
                                            } else {
                                                text_to_show = "Sorry something seems to be unclear to you.\nWe are going to review the instructions/tips one more time.\n\nPress space to continue";
                                            }
                                        }
                                    }
                                }
                            } else {
                                if ((quiz_set === 7)) {
                                    test_q.alignHoriz = "left";
                                    if ((round7.thisN === 0)) {
                                        text_to_show = "Quiz: The 3rd ticket (loading station):\n\na) Improves my chances of getting on my ride (but how much varies by planet) \nb) Can only worsen my chances of getting on my ride\nc) Depends on the planet whether it improves or worsens my chances";
                                        cor_first = 0;
                                    } else {
                                        if ((round7.thisN === 1)) {
                                            text_to_show = "Quiz: If the ride generally stops for me after the first ticket, its always better to buy extra tickets \n\na) I have nothing to lose by purchasing three tickets\nb) Extra tickets do take away from my bonus so if I can win with fewer tickets, I should save the money";
                                        } else {
                                            if ((round7.thisN === 2)) {
                                                text_to_show = "Quiz:  If I purchase 3 tickets and make it on\n\na) It could be my ride stopped for me (ticket 1), I jumped from the regular platform (ticket 2), or I jumped from the loading area (ticket 3)\n\nb) It must be that my ride did not stop for me (ticket 1) but I jumped on anyway\n\nc) It must be that I specifically made it from the loading area";
                                            } else {
                                                if ((round7.thisN === 3)) {
                                                    if ((cor_first === 3)) {
                                                        text_to_show = "Nice job! You are on a roll.\n\n Press space to continue";
                                                        before_task = false;
                                                        loop7.finished = true;
                                                    } else {
                                                        text_to_show = "Sorry something seems to be unclear to you.\nWe are going to review the instructions/tips one more time.\n\nPress space to continue";
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if ((in_task === true)) {
        if ((block.thisN === 3)) {
            continueRoutine = true;
        } else {
            act_testing.finished = true;
            relearn_rules.finished = true;
            continueRoutine = false;
        }
        if ((act_testing.thisN === 0)) {
            corr_total = 0;
            text_to_show = "If after purchasing three tickets I still end up walking, then jumping is extremely difficult AND my ride never stops for me\n\na) True\nb) False";
        } else {
            if ((act_testing.thisN === 1)) {
                text_to_show = "If I frequently board the train/plane after jumping from the regular platform, then the platform is likely relatively wide OR my ride usually stops for me \n\na) True\nb) False";
            } else {
                if ((act_testing.thisN === 2)) {
                    text_to_show = "If I frequently board the train/plane, BUT ONLY from the LOADING STATION, then the LOADING AREA is wide enough for success BUT the vehicle does not stop for me otherwise \n\na) True\nb) False";
                } else {
                    if ((act_testing.thisN === 3)) {
                        if ((corr_total === 3)) {
                            text_to_show = "Nice job! Now you will explore some narrow practice blocks with feedback.\n\nThese blocks will help get you accustomed to the new version of the game\n\nPress space to continue";
                        } else {
                            text_to_show = "Sorry something seems to be unclear to you.\nWe are going to review the instructions/tips one more time.\n\nPress space to continue";
                        }
                    }
                }
            }
        }
    }
    
    test_q.setText(text_to_show);
    quiz_answer.keys = undefined;
    quiz_answer.rt = undefined;
    _quiz_answer_allKeys = [];
    warnin.setText(texts);
    // keep track of which components have finished
    quizComponents = [];
    quizComponents.push(test_q);
    quizComponents.push(quiz_answer);
    quizComponents.push(warnin);
    
    quizComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function quizRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'quiz'-------
    // get current time
    t = quizClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *test_q* updates
    if (t >= 0.0 && test_q.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      test_q.tStart = t;  // (not accounting for frame time here)
      test_q.frameNStart = frameN;  // exact frame index
      
      test_q.setAutoDraw(true);
    }

    
    // *quiz_answer* updates
    if (t >= 0.0 && quiz_answer.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      quiz_answer.tStart = t;  // (not accounting for frame time here)
      quiz_answer.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { quiz_answer.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { quiz_answer.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { quiz_answer.clearEvents(); });
    }

    if (quiz_answer.status === PsychoJS.Status.STARTED) {
      let theseKeys = quiz_answer.getKeys({keyList: ['a', 'b', 'c', 'd', 'space'], waitRelease: false});
      _quiz_answer_allKeys = _quiz_answer_allKeys.concat(theseKeys);
      if (_quiz_answer_allKeys.length > 0) {
        quiz_answer.keys = _quiz_answer_allKeys[_quiz_answer_allKeys.length - 1].name;  // just the last key pressed
        quiz_answer.rt = _quiz_answer_allKeys[_quiz_answer_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *warnin* updates
    if (t >= 0.0 && warnin.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      warnin.tStart = t;  // (not accounting for frame time here)
      warnin.frameNStart = frameN;  // exact frame index
      
      warnin.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    quizComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function quizRoutineEnd() {
  return async function () {
    //------Ending Routine 'quiz'-------
    quizComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    if ((before_task === true)) {
        if ((quiz_set === 1)) {
            if ((round1.thisN === 0)) {
                if ((quiz_answer.keys === "a")) {
                    cor_first += 1;
                    psychoJS.experiment.addData("quiz_1", 1);
                } else {
                    cor_first = 0;
                    psychoJS.experiment.addData("quiz_1", 0);
                    num_wrong += 1;
                }
            } else {
                if ((round1.thisN === 1)) {
                    if ((quiz_answer.keys === "b")) {
                        cor_first += 1;
                        psychoJS.experiment.addData("quiz_1", 1);
                    } else {
                        cor_first = 0;
                        psychoJS.experiment.addData("quiz_1", 0);
                        num_wrong += 1;
                    }
                } else {
                    if ((round1.thisN === 2)) {
                        if ((quiz_answer.keys === "b")) {
                            cor_first += 1;
                            psychoJS.experiment.addData("quiz_1", 1);
                        } else {
                            cor_first = 0;
                            num_wrong += 1;
                            psychoJS.experiment.addData("quiz_1", 0);
                            console.log(("num wrong" + num_wrong.toString()));
                        }
                    } else {
                        if ((round1.thisN === 3)) {
                            if ((cor_first >= 3)) {
                                quiz_set += 1;
                                loop1.finished = true;
                                cor_first = 0;
                            } else {
                                slide_review = 1;
                                times_quiz_wrong += 1;
                                review_first.thisN = 0;
                                set_of_instructions = 1;
                                cor_first = 0;
                                if ((loop1.thisN > 2)) {
                                    psychoJS.quit({message: 'Sorry you failed too many quizz questions. You cannot continue this study. Please return it since you will not be paid for your continued time'});
                                }
                                continueRoutine = false;
                            }
                        }
                    }
                }
            }
        } else {
            if ((quiz_set === 2)) {
                console.log(("quiz set os" + quiz_set.toString()));
                if ((round2.thisN === 0)) {
                    if ((quiz_answer.keys === "a")) {
                        cor_first += 1;
                        psychoJS.experiment.addData("quiz_2", 1);
                    } else {
                        psychoJS.experiment.addData("quiz_2", 0);
                        cor_first = 0;
                        num_wrong += 1;
                    }
                } else {
                    if ((round2.thisN === 1)) {
                        if ((quiz_answer.keys === "b")) {
                            cor_first += 1;
                            psychoJS.experiment.addData("quiz_2", 1);
                        } else {
                            cor_first = 0;
                            psychoJS.experiment.addData("quiz_2", 0);
                            num_wrong += 1;
                        }
                    } else {
                        if ((round2.thisN === 2)) {
                            if ((cor_first >= 2)) {
                                loop2.finished = true;
                                quiz_set += 1;
                                cor_first = 0;
                                continueRoutine = false;
                            } else {
                                slide_review = 4;
                                times_quiz_wrong += 1;
                                set_of_instructions = 2;
                                if ((loop2.thisN > 2)) {
                                    psychoJS.quit({message: 'Sorry you failed too many quizz questions. You cannot continue this study. Please return it since you will not be paid for your continued time'});
                                }
                                cor_first = 0;
                            }
                        }
                    }
                }
            } else {
                if ((quiz_set === 3)) {
                    if ((round3.thisN === 0)) {
                        if ((quiz_answer.keys === "a")) {
                            cor_first += 1;
                            psychoJS.experiment.addData("quiz_3", 1);
                        } else {
                            cor_first = 0;
                            psychoJS.experiment.addData("quiz_3", 0);
                            num_wrong += 1;
                        }
                    } else {
                        if ((round3.thisN === 1)) {
                            if ((quiz_answer.keys === "a")) {
                                cor_first += 1;
                                psychoJS.experiment.addData("quiz_3", 1);
                            } else {
                                cor_first = 0;
                                psychoJS.experiment.addData("quiz_3", 0);
                                num_wrong += 1;
                            }
                        } else {
                            if ((round3.thisN === 2)) {
                                if ((quiz_answer.keys === "b")) {
                                    cor_first += 1;
                                    psychoJS.experiment.addData("quiz_3", 1);
                                } else {
                                    cor_first = 0;
                                    num_wrong += 1;
                                    psychoJS.experiment.addData("quiz_3", 0);
                                }
                            } else {
                                if ((round3.thisN === 3)) {
                                    if ((cor_first >= 2)) {
                                        loop3.finished = true;
                                        cor_first = 0;
                                        quiz_set += 1;
                                        console.log("quiz set");
                                        continueRoutine = false;
                                    } else {
                                        slide_review = 7;
                                        set_of_instructions = 3;
                                        times_quiz_wrong += 1;
                                        cor_first = 0;
                                        if ((loop3.thisN > 2)) {
                                            psychoJS.quit({message: 'Sorry you failed too many quizz questions. You cannot continue this study. Please return it since you will not be paid for your continued time'});
                                        }
                                        continueRoutine = false;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if ((quiz_set === 4)) {
                        miss_sometimes = true;
                        if ((round4.thisN === 0)) {
                            if ((quiz_answer.keys === "b")) {
                                cor_first += 1;
                                psychoJS.experiment.addData("quiz_4", 1);
                            } else {
                                cor_first = 0;
                                num_wrong += 1;
                                psychoJS.experiment.addData("quiz_4", 0);
                            }
                        } else {
                            if ((round4.thisN === 1)) {
                                if ((quiz_answer.keys === "a")) {
                                    cor_first += 1;
                                    psychoJS.experiment.addData("quiz_4", 1);
                                } else {
                                    cor_first = 0;
                                    num_wrong += 1;
                                    psychoJS.experiment.addData("quiz_4", 0);
                                }
                            } else {
                                if ((round4.thisN === 2)) {
                                    if ((quiz_answer.keys === "b")) {
                                        cor_first += 1;
                                        psychoJS.experiment.addData("quiz_4", 1);
                                    } else {
                                        cor_first = 0;
                                        num_wrong += 1;
                                        psychoJS.experiment.addData("quiz_4", 0);
                                    }
                                } else {
                                    if ((round4.thisN === 3)) {
                                        if ((cor_first >= 3)) {
                                            loop4.finished = true;
                                            quiz_set += 1;
                                            cor_first = 0;
                                            times_quiz_wrong += 1;
                                            continueRoutine = false;
                                        } else {
                                            slide_review = 12;
                                            cor_first = 0;
                                            set_of_instructions = 4;
                                            if ((loop4.thisN > 2)) {
                                                psychoJS.quit({message: 'Sorry you failed too many quizz questions. You cannot continue this study. Please return it since you will not be paid for your continued time'});
                                            }
                                        }
                                        miss_sometimes = true;
                                    }
                                }
                            }
                        }
                    } else {
                        if ((quiz_set === 5)) {
                            if ((round5.thisN === 0)) {
                                if ((quiz_answer.keys === "a")) {
                                    cor_first += 1;
                                    psychoJS.experiment.addData("quiz_5", 1);
                                } else {
                                    cor_first = 0;
                                    num_wrong += 1;
                                    psychoJS.experiment.addData("quiz_5", 0);
                                }
                            } else {
                                if ((round5.thisN === 1)) {
                                    if ((quiz_answer.keys === "a")) {
                                        cor_first += 1;
                                        psychoJS.experiment.addData("quiz_5", 1);
                                    } else {
                                        cor_first = 0;
                                        psychoJS.experiment.addData("quiz_5", 0);
                                        num_wrong += 1;
                                    }
                                } else {
                                    if ((round5.thisN === 2)) {
                                        if ((cor_first >= 2)) {
                                            loop5.finished = true;
                                            quiz_set += 1;
                                            cor_first = 0;
                                            continueRoutine = false;
                                        } else {
                                            slide_review = 18;
                                            times_quiz_wrong += 1;
                                            set_of_instructions -= 1;
                                            cor_first = 0;
                                            if ((loop5.thisN > 2)) {
                                                psychoJS.quit({message: 'Sorry you failed too many quizz questions. You cannot continue this study. Please return it since you will not be paid for your continued time'});
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            if ((quiz_set === 6)) {
                                if ((round6.thisN === 0)) {
                                    if ((quiz_answer.keys === "b")) {
                                        cor_first += 1;
                                        psychoJS.experiment.addData("quiz_6", 1);
                                    } else {
                                        cor_first = 0;
                                        num_wrong += 1;
                                        psychoJS.experiment.addData("quiz_6", 0);
                                    }
                                } else {
                                    if ((round6.thisN === 1)) {
                                        if ((quiz_answer.keys === "a")) {
                                            cor_first += 1;
                                            psychoJS.experiment.addData("quiz_6", 1);
                                        } else {
                                            cor_first = 0;
                                            num_wrong += 1;
                                            psychoJS.experiment.addData("quiz_6", 0);
                                        }
                                    } else {
                                        if ((round6.thisN === 2)) {
                                            if ((cor_first >= 2)) {
                                                loop6.finished = true;
                                                quiz_set += 1;
                                                continueRoutine = false;
                                                cor_first = 0;
                                            } else {
                                                slide_review = 23;
                                                times_quiz_wrong += 1;
                                                set_of_instructions -= 1;
                                                cor_first = 0;
                                                if ((loop6.thisN > 2)) {
                                                    psychoJS.quit({message: 'Sorry you failed too many quizz questions. You cannot continue this study. Please return it since you will not be paid for your continued time'});
                                                }
                                            }
                                        }
                                    }
                                }
                            } else {
                                if ((quiz_set === 7)) {
                                    if ((round7.thisN === 0)) {
                                        if ((quiz_answer.keys === "a")) {
                                            cor_first += 1;
                                            psychoJS.experiment.addData("quiz_7", 1);
                                        } else {
                                            cor_first = 0;
                                            num_wrong += 1;
                                            psychoJS.experiment.addData("quiz_7", 0);
                                        }
                                    } else {
                                        if ((round7.thisN === 1)) {
                                            if ((quiz_answer.keys === "b")) {
                                                cor_first += 1;
                                                psychoJS.experiment.addData("quiz_7", 1);
                                            } else {
                                                cor_first = 0;
                                                num_wrong += 1;
                                                psychoJS.experiment.addData("quiz_7", 0);
                                            }
                                        } else {
                                            if ((round7.thisN === 2)) {
                                                if ((quiz_answer.keys === "a")) {
                                                    cor_first += 1;
                                                    psychoJS.experiment.addData("quiz_7", 1);
                                                } else {
                                                    cor_first = 0;
                                                    psychoJS.experiment.addData("quiz_7", 1);
                                                    num_wrong += 1;
                                                }
                                            } else {
                                                if ((round7.thisN === 3)) {
                                                    if ((cor_first >= 3)) {
                                                        loop7.finished = true;
                                                        cor_first = 0;
                                                        round7.finished = true;
                                                        before_task = false;
                                                        continueRoutine = false;
                                                    } else {
                                                        slide_review = 29;
                                                        cor_first = 0;
                                                        times_quiz_wrong += 1;
                                                        set_of_instructions -= 1;
                                                        if ((loop7.thisN > 3)) {
                                                            psychoJS.quit({message: 'Sorry you failed too many quizz questions. You cannot continue this study. Please return it since you will not be paid for your continued time'});
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        if ((in_task === true)) {
            if ((quiz_answer.keys === "a")) {
                corr_total += 1;
                psychoJS.experiment.addData("quiz_8", 1);
            } else {
                corr_total = 0;
                num_wrong += 1;
                psychoJS.experiment.addData("quiz_8", 0);
            }
            if ((corr_total >= 3)) {
                review_loop_1.finished = true;
                relearn_rules.finished = true;
                act_testing.finished = true;
            } else {
                slide_review = 39;
                if ((relearn_rules.thisN > 3)) {
                    psychoJS.quit({message: 'Sorry you failed too many quizz questions. You cannot continue this study. Please return it since you will not be paid for your continued time'});
                }
            }
        }
    }
    psychoJS.experiment.addData("num_wrong", num_wrong);
    console.log(("num_wrong" + num_wrong.toString()));
    
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(quiz_answer.corr, level);
    }
    psychoJS.experiment.addData('quiz_answer.keys', quiz_answer.keys);
    if (typeof quiz_answer.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('quiz_answer.rt', quiz_answer.rt);
        routineTimer.reset();
        }
    
    quiz_answer.stop();
    // the Routine "quiz" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var beg_island;
var end_island;
var _key_resp_1_allKeys;
var make_fake_choiceComponents;
function make_fake_choiceRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'make_fake_choice'-------
    t = 0;
    make_fake_choiceClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    if ((last_beg === 0)) {
        beg_island = island_b0;
        last_beg = 1;
    } else {
        beg_island = island_b1;
        last_beg = 0;
    }
    shuffle(islands);
    shuffle(transport);
    end_island = islands[0];
    
    dep_island_6.setImage(beg_island);
    key_resp_1.keys = undefined;
    key_resp_1.rt = undefined;
    _key_resp_1_allKeys = [];
    // keep track of which components have finished
    make_fake_choiceComponents = [];
    make_fake_choiceComponents.push(dep_island_6);
    make_fake_choiceComponents.push(key_resp_1);
    make_fake_choiceComponents.push(explain_2);
    
    make_fake_choiceComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function make_fake_choiceRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'make_fake_choice'-------
    // get current time
    t = make_fake_choiceClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *dep_island_6* updates
    if (t >= 0.0 && dep_island_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dep_island_6.tStart = t;  // (not accounting for frame time here)
      dep_island_6.frameNStart = frameN;  // exact frame index
      
      dep_island_6.setAutoDraw(true);
    }

    
    // *key_resp_1* updates
    if (t >= 0.0 && key_resp_1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_1.tStart = t;  // (not accounting for frame time here)
      key_resp_1.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_1.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_1.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_1.clearEvents(); });
    }

    if (key_resp_1.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_1.getKeys({keyList: ['space'], waitRelease: false});
      _key_resp_1_allKeys = _key_resp_1_allKeys.concat(theseKeys);
      if (_key_resp_1_allKeys.length > 0) {
        key_resp_1.keys = _key_resp_1_allKeys[_key_resp_1_allKeys.length - 1].name;  // just the last key pressed
        key_resp_1.rt = _key_resp_1_allKeys[_key_resp_1_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *explain_2* updates
    if (t >= 0.0 && explain_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      explain_2.tStart = t;  // (not accounting for frame time here)
      explain_2.frameNStart = frameN;  // exact frame index
      
      explain_2.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    make_fake_choiceComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function make_fake_choiceRoutineEnd() {
  return async function () {
    //------Ending Routine 'make_fake_choice'-------
    make_fake_choiceComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(key_resp_1.corr, level);
    }
    psychoJS.experiment.addData('key_resp_1.keys', key_resp_1.keys);
    if (typeof key_resp_1.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_1.rt', key_resp_1.rt);
        routineTimer.reset();
        }
    
    key_resp_1.stop();
    // the Routine "make_fake_choice" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var show_back;
var start_time;
var show_fake_choiceComponents;
function show_fake_choiceRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'show_fake_choice'-------
    t = 0;
    show_fake_choiceClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(1.000000);
    // update component parameters for each repeat
    show_back = 1000;
    start_time = 0;
    
    dep_island_7.setImage(beg_island);
    // keep track of which components have finished
    show_fake_choiceComponents = [];
    show_fake_choiceComponents.push(walking_2);
    show_fake_choiceComponents.push(dep_island_7);
    
    show_fake_choiceComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function show_fake_choiceRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'show_fake_choice'-------
    // get current time
    t = show_fake_choiceClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *walking_2* updates
    if (t >= 0.0 && walking_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      walking_2.tStart = t;  // (not accounting for frame time here)
      walking_2.frameNStart = frameN;  // exact frame index
      
      walking_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 1 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (walking_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      walking_2.setAutoDraw(false);
    }
    
    // *dep_island_7* updates
    if (t >= 0.0 && dep_island_7.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dep_island_7.tStart = t;  // (not accounting for frame time here)
      dep_island_7.frameNStart = frameN;  // exact frame index
      
      dep_island_7.setAutoDraw(true);
    }

    frameRemains = 0.0 + 1 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (dep_island_7.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      dep_island_7.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    show_fake_choiceComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function show_fake_choiceRoutineEnd() {
  return async function () {
    //------Ending Routine 'show_fake_choice'-------
    show_fake_choiceComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    return Scheduler.Event.NEXT;
  };
}


var dep_time;
var dep_time_first;
var dplace;
var _next_trial_2_allKeys;
var feeedbackssComponents;
function feeedbackssRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'feeedbackss'-------
    t = 0;
    feeedbackssClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(5.000000);
    // update component parameters for each repeat
    dep_time = 2.5;
    dep_time_first = 2.5;
    dplace = state_transitions[beg_island];
    
    departure_state_3.setImage(beg_island);
    final_state_3.setImage(dplace);
    next_trial_2.keys = undefined;
    next_trial_2.rt = undefined;
    _next_trial_2_allKeys = [];
    // keep track of which components have finished
    feeedbackssComponents = [];
    feeedbackssComponents.push(departure_state_3);
    feeedbackssComponents.push(final_state_3);
    feeedbackssComponents.push(text);
    feeedbackssComponents.push(next_trial_2);
    feeedbackssComponents.push(walking_3);
    
    feeedbackssComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function feeedbackssRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'feeedbackss'-------
    // get current time
    t = feeedbackssClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *departure_state_3* updates
    if (t >= 0 && departure_state_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      departure_state_3.tStart = t;  // (not accounting for frame time here)
      departure_state_3.frameNStart = frameN;  // exact frame index
      
      departure_state_3.setAutoDraw(true);
    }

    frameRemains = 0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (departure_state_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      departure_state_3.setAutoDraw(false);
    }
    
    // *final_state_3* updates
    if (t >= 0 && final_state_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      final_state_3.tStart = t;  // (not accounting for frame time here)
      final_state_3.frameNStart = frameN;  // exact frame index
      
      final_state_3.setAutoDraw(true);
    }

    frameRemains = 0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (final_state_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      final_state_3.setAutoDraw(false);
    }
    
    // *text* updates
    if (t >= 2 && text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text.tStart = t;  // (not accounting for frame time here)
      text.frameNStart = frameN;  // exact frame index
      
      text.setAutoDraw(true);
    }

    frameRemains = 2 + 3 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text.setAutoDraw(false);
    }
    
    // *next_trial_2* updates
    if (t >= 0 && next_trial_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      next_trial_2.tStart = t;  // (not accounting for frame time here)
      next_trial_2.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { next_trial_2.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { next_trial_2.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { next_trial_2.clearEvents(); });
    }

    frameRemains = 0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (next_trial_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      next_trial_2.status = PsychoJS.Status.FINISHED;
  }

    if (next_trial_2.status === PsychoJS.Status.STARTED) {
      let theseKeys = next_trial_2.getKeys({keyList: ['space'], waitRelease: false});
      _next_trial_2_allKeys = _next_trial_2_allKeys.concat(theseKeys);
      if (_next_trial_2_allKeys.length > 0) {
        next_trial_2.keys = _next_trial_2_allKeys[_next_trial_2_allKeys.length - 1].name;  // just the last key pressed
        next_trial_2.rt = _next_trial_2_allKeys[_next_trial_2_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *walking_3* updates
    if (t >= 0.0 && walking_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      walking_3.tStart = t;  // (not accounting for frame time here)
      walking_3.frameNStart = frameN;  // exact frame index
      
      walking_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (walking_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      walking_3.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    feeedbackssComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function feeedbackssRoutineEnd() {
  return async function () {
    //------Ending Routine 'feeedbackss'-------
    feeedbackssComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(next_trial_2.corr, level);
    }
    psychoJS.experiment.addData('next_trial_2.keys', next_trial_2.keys);
    if (typeof next_trial_2.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('next_trial_2.rt', next_trial_2.rt);
        routineTimer.reset();
        }
    
    next_trial_2.stop();
    return Scheduler.Event.NEXT;
  };
}


var _key_resp_3_allKeys;
var new_examplesComponents;
function new_examplesRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'new_examples'-------
    t = 0;
    new_examplesClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(15.000000);
    // update component parameters for each repeat
    console.log(("miss_sometimes" + miss_sometimes.toString()));
    if ((miss_sometimes === false)) {
        if ((see_actions.thisN === 0)) {
            texts = "In the next practice, you decide how to travel.\nIf you want to walk (by pressing \"N\"), or whether you want to travel by train/plane (Press \"Y\")\n\nTo move forward, you need to get to the treasure location 5 times in a row.\n\nPress space to continue.";
        } else {
            continueRoutine = false;
        }
    } else {
        if ((miss_ride_sometimes.thisN === 0)) {
            texts = "In the next practice, you decide if you want to walk (by pressing \"N\"), or whether you want to travel by train/plane (Press \"Y\")\n\nPress space to continue.";
        } else {
            continueRoutine = false;
        }
    }
    text_5.alignHoriz = "left";
    
    text_5.setText(texts);
    key_resp_3.keys = undefined;
    key_resp_3.rt = undefined;
    _key_resp_3_allKeys = [];
    // keep track of which components have finished
    new_examplesComponents = [];
    new_examplesComponents.push(text_5);
    new_examplesComponents.push(key_resp_3);
    
    new_examplesComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function new_examplesRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'new_examples'-------
    // get current time
    t = new_examplesClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_5* updates
    if (t >= 0.0 && text_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_5.tStart = t;  // (not accounting for frame time here)
      text_5.frameNStart = frameN;  // exact frame index
      
      text_5.setAutoDraw(true);
    }

    frameRemains = 0.0 + 15 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_5.setAutoDraw(false);
    }
    
    // *key_resp_3* updates
    if (t >= 0.0 && key_resp_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_3.tStart = t;  // (not accounting for frame time here)
      key_resp_3.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_3.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_3.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_3.clearEvents(); });
    }

    frameRemains = 0.0 + 15 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (key_resp_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      key_resp_3.status = PsychoJS.Status.FINISHED;
  }

    if (key_resp_3.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_3.getKeys({keyList: ['space'], waitRelease: false});
      _key_resp_3_allKeys = _key_resp_3_allKeys.concat(theseKeys);
      if (_key_resp_3_allKeys.length > 0) {
        key_resp_3.keys = _key_resp_3_allKeys[_key_resp_3_allKeys.length - 1].name;  // just the last key pressed
        key_resp_3.rt = _key_resp_3_allKeys[_key_resp_3_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    new_examplesComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function new_examplesRoutineEnd() {
  return async function () {
    //------Ending Routine 'new_examples'-------
    new_examplesComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(key_resp_3.corr, level);
    }
    psychoJS.experiment.addData('key_resp_3.keys', key_resp_3.keys);
    if (typeof key_resp_3.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_3.rt', key_resp_3.rt);
        routineTimer.reset();
        }
    
    key_resp_3.stop();
    return Scheduler.Event.NEXT;
  };
}


var instr_text;
var start_stop;
var r;
var left_plane;
var right_plane;
var _key_resp_15_allKeys;
var opt_in_choice_2Components;
function opt_in_choice_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'opt_in_choice_2'-------
    t = 0;
    opt_in_choice_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    text_2.alignHoriz = "left";
    if ((miss_sometimes === false)) {
        instr_text = "You decide how you want to travel\n\n\nBuy a ticket (Press Y)\nI rather walk (Press N)";
    } else {
        instr_text = "This time your ride will not always stop for you!\n\n\nBuy a ticket (Press Y)";
    }
    
    start_stop=randomsample([0,1],2)
    r=randint(0,2);
    
    beg_island = islands_start[r];
    
    left_plane = transport[start_stop[0]];
    right_plane = transport[start_stop[1]];
    if ((beg_island=='islands/hut.png')) {
        end_island = 'islands/town.png';
        } else {
            end_island ='islands/mountain.png';   
        }
    dep_island_22.setImage(beg_island);
    key_resp_15.keys = undefined;
    key_resp_15.rt = undefined;
    _key_resp_15_allKeys = [];
    text_2.setText(instr_text);
    // keep track of which components have finished
    opt_in_choice_2Components = [];
    opt_in_choice_2Components.push(dep_island_22);
    opt_in_choice_2Components.push(key_resp_15);
    opt_in_choice_2Components.push(text_2);
    
    opt_in_choice_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function opt_in_choice_2RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'opt_in_choice_2'-------
    // get current time
    t = opt_in_choice_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *dep_island_22* updates
    if (t >= 0.0 && dep_island_22.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dep_island_22.tStart = t;  // (not accounting for frame time here)
      dep_island_22.frameNStart = frameN;  // exact frame index
      
      dep_island_22.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (dep_island_22.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      dep_island_22.setAutoDraw(false);
    }
    
    // *key_resp_15* updates
    if (t >= 0.0 && key_resp_15.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_15.tStart = t;  // (not accounting for frame time here)
      key_resp_15.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_15.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_15.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_15.clearEvents(); });
    }

    if (key_resp_15.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_15.getKeys({keyList: ['y', 'n', '1', '9'], waitRelease: false});
      _key_resp_15_allKeys = _key_resp_15_allKeys.concat(theseKeys);
      if (_key_resp_15_allKeys.length > 0) {
        key_resp_15.keys = _key_resp_15_allKeys[_key_resp_15_allKeys.length - 1].name;  // just the last key pressed
        key_resp_15.rt = _key_resp_15_allKeys[_key_resp_15_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *text_2* updates
    if (t >= 0.0 && text_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_2.tStart = t;  // (not accounting for frame time here)
      text_2.frameNStart = frameN;  // exact frame index
      
      text_2.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    opt_in_choice_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var cs;
var action_or_not;
function opt_in_choice_2RoutineEnd() {
  return async function () {
    //------Ending Routine 'opt_in_choice_2'-------
    opt_in_choice_2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(key_resp_15.corr, level);
    }
    psychoJS.experiment.addData('key_resp_15.keys', key_resp_15.keys);
    if (typeof key_resp_15.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_15.rt', key_resp_15.rt);
        routineTimer.reset();
        }
    
    key_resp_15.stop();
    if ((key_resp_15.keys === "y")) {
        cs = 1;
        action_or_not = 0;
    } else {
        if ((key_resp_15.keys === "n")) {
            cs = 0;
            action_or_not = 3;
        }
    }
    
    // the Routine "opt_in_choice_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _key_resp_8_allKeys;
var make_choice_2Components;
function make_choice_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'make_choice_2'-------
    t = 0;
    make_choice_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    if ((cs === 0)) {
        continueRoutine=false;
    }
    
    
    
    shuffle(islands);
    shuffle(transport);
    end_island = islands[0];
    left_plane = transport[0];
    right_plane = transport[1];
    
    left_choice_5.setImage(left_plane);
    right_choice_5.setImage(right_plane);
    destination_island_5.setImage(end_island);
    key_resp_8.keys = undefined;
    key_resp_8.rt = undefined;
    _key_resp_8_allKeys = [];
    dep_island_23.setImage(beg_island);
    // keep track of which components have finished
    make_choice_2Components = [];
    make_choice_2Components.push(press1);
    make_choice_2Components.push(left_choice_5);
    make_choice_2Components.push(right_choice_5);
    make_choice_2Components.push(destination_island_5);
    make_choice_2Components.push(key_resp_8);
    make_choice_2Components.push(dep_island_23);
    make_choice_2Components.push(press9_2);
    
    make_choice_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function make_choice_2RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'make_choice_2'-------
    // get current time
    t = make_choice_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *press1* updates
    if (t >= 0.0 && press1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      press1.tStart = t;  // (not accounting for frame time here)
      press1.frameNStart = frameN;  // exact frame index
      
      press1.setAutoDraw(true);
    }

    
    // *left_choice_5* updates
    if (t >= 0.0 && left_choice_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      left_choice_5.tStart = t;  // (not accounting for frame time here)
      left_choice_5.frameNStart = frameN;  // exact frame index
      
      left_choice_5.setAutoDraw(true);
    }

    
    // *right_choice_5* updates
    if (t >= 0.0 && right_choice_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      right_choice_5.tStart = t;  // (not accounting for frame time here)
      right_choice_5.frameNStart = frameN;  // exact frame index
      
      right_choice_5.setAutoDraw(true);
    }

    
    // *destination_island_5* updates
    if (t >= 0.0 && destination_island_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      destination_island_5.tStart = t;  // (not accounting for frame time here)
      destination_island_5.frameNStart = frameN;  // exact frame index
      
      destination_island_5.setAutoDraw(true);
    }

    
    // *key_resp_8* updates
    if (t >= 0.0 && key_resp_8.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_8.tStart = t;  // (not accounting for frame time here)
      key_resp_8.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_8.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_8.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_8.clearEvents(); });
    }

    if (key_resp_8.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_8.getKeys({keyList: [1, '1', '9', 9], waitRelease: false});
      _key_resp_8_allKeys = _key_resp_8_allKeys.concat(theseKeys);
      if (_key_resp_8_allKeys.length > 0) {
        key_resp_8.keys = _key_resp_8_allKeys[_key_resp_8_allKeys.length - 1].name;  // just the last key pressed
        key_resp_8.rt = _key_resp_8_allKeys[_key_resp_8_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *dep_island_23* updates
    if (t >= 0.0 && dep_island_23.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dep_island_23.tStart = t;  // (not accounting for frame time here)
      dep_island_23.frameNStart = frameN;  // exact frame index
      
      dep_island_23.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (dep_island_23.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      dep_island_23.setAutoDraw(false);
    }
    
    // *press9_2* updates
    if (t >= 0.0 && press9_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      press9_2.tStart = t;  // (not accounting for frame time here)
      press9_2.frameNStart = frameN;  // exact frame index
      
      press9_2.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    make_choice_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function make_choice_2RoutineEnd() {
  return async function () {
    //------Ending Routine 'make_choice_2'-------
    make_choice_2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(key_resp_8.corr, level);
    }
    psychoJS.experiment.addData('key_resp_8.keys', key_resp_8.keys);
    if (typeof key_resp_8.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_8.rt', key_resp_8.rt);
        routineTimer.reset();
        }
    
    key_resp_8.stop();
    // the Routine "make_choice_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var walking_choice;
var var_time_left;
var var_time_right;
var show_choice_2Components;
function show_choice_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'show_choice_2'-------
    t = 0;
    show_choice_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    show_back = 0;
    start_time = 0;
    if ((cs === 0)) {
        walking_choice = 1;
        var_time_left = 0;
        var_time_right = 0;
    } else {
        walking_choice = 0;
        if ((key_resp_8.keys === "1")) {
            plane_selected = left_plane;
            var_time_left = 1;
            var_time_right = 0;
        } else {
            plane_selected = right_plane;
            var_time_left = 0;
            var_time_right = 1;
        }
    }
    
    right_choice_6.setImage(right_plane);
    dep_island_24.setImage(beg_island);
    final_state_supposed_to_3.setImage(end_island);
    left_choice_6.setImage(left_plane);
    // keep track of which components have finished
    show_choice_2Components = [];
    show_choice_2Components.push(right_choice_6);
    show_choice_2Components.push(walking_4);
    show_choice_2Components.push(dep_island_24);
    show_choice_2Components.push(final_state_supposed_to_3);
    show_choice_2Components.push(inteded_location_4);
    show_choice_2Components.push(left_choice_6);
    
    show_choice_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function show_choice_2RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'show_choice_2'-------
    // get current time
    t = show_choice_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *right_choice_6* updates
    if (t >= start_time && right_choice_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      right_choice_6.tStart = t;  // (not accounting for frame time here)
      right_choice_6.frameNStart = frameN;  // exact frame index
      
      right_choice_6.setAutoDraw(true);
    }

    frameRemains = start_time + var_time_right - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (right_choice_6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      right_choice_6.setAutoDraw(false);
    }
    
    // *walking_4* updates
    if (t >= 0.0 && walking_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      walking_4.tStart = t;  // (not accounting for frame time here)
      walking_4.frameNStart = frameN;  // exact frame index
      
      walking_4.setAutoDraw(true);
    }

    frameRemains = 0.0 + walking_choice - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (walking_4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      walking_4.setAutoDraw(false);
    }
    
    // *dep_island_24* updates
    if (t >= 0.0 && dep_island_24.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dep_island_24.tStart = t;  // (not accounting for frame time here)
      dep_island_24.frameNStart = frameN;  // exact frame index
      
      dep_island_24.setAutoDraw(true);
    }

    frameRemains = 0.0 + 1 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (dep_island_24.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      dep_island_24.setAutoDraw(false);
    }
    
    // *final_state_supposed_to_3* updates
    if (t >= 0 && final_state_supposed_to_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      final_state_supposed_to_3.tStart = t;  // (not accounting for frame time here)
      final_state_supposed_to_3.frameNStart = frameN;  // exact frame index
      
      final_state_supposed_to_3.setAutoDraw(true);
    }

    frameRemains = 0 + 1 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (final_state_supposed_to_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      final_state_supposed_to_3.setAutoDraw(false);
    }
    
    // *inteded_location_4* updates
    if (t >= 0.0 && inteded_location_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      inteded_location_4.tStart = t;  // (not accounting for frame time here)
      inteded_location_4.frameNStart = frameN;  // exact frame index
      
      inteded_location_4.setAutoDraw(true);
    }

    frameRemains = 0.0 + 1 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (inteded_location_4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      inteded_location_4.setAutoDraw(false);
    }
    
    // *left_choice_6* updates
    if (t >= start_time && left_choice_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      left_choice_6.tStart = t;  // (not accounting for frame time here)
      left_choice_6.frameNStart = frameN;  // exact frame index
      
      left_choice_6.setAutoDraw(true);
    }

    frameRemains = start_time + var_time_left - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (left_choice_6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      left_choice_6.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    show_choice_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function show_choice_2RoutineEnd() {
  return async function () {
    //------Ending Routine 'show_choice_2'-------
    show_choice_2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "show_choice_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var pos_d;
var left_arrow;
var right_arrow;
var miss_or;
var lets_see;
var plane_to_show;
var only_if_acted;
var _next_trial_3_allKeys;
var feeedback__2Components;
function feeedback__2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'feeedback__2'-------
    t = 0;
    feeedback__2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    pos_d = [0, 0];
    if ((left_plane === plane_selected)) {
        pos_d = [-0.25, 0.25];
        left_arrow = 100;
        right_arrow = 0;
    } else {
        if ((right_plane === plane_selected)) {
            pos_d = [0.25, 0.25];
            left_arrow = 0;
            right_arrow = 100;
        }
    }
    miss_or=6;
    if ((miss_sometimes === true)) {
        miss_or=0;
        if ((cs === 1)) {
            lets_see = randint(0, 7);
            
            if ((lets_see > 2)) {
                cs = 0;
            }
        }
    }
    if ((cs === 1)) {
        plane_to_show = plane_selected;
        only_if_acted = 7;
        walking_choice = 0;
        dplace = action_transitions[plane_selected];
    } else {
        plane_to_show = left_plane;
        dplace = state_transitions[beg_island];
        walking_choice = 7;
        only_if_acted = 0.0;
    }
    if ((dplace === end_island)) {
        num_consecutive_correct += 1;
    } else {
        num_consecutive_correct = 0;
    }
    
    tran_selected_3.setPos(pos_d);
    tran_selected_3.setImage(plane_to_show);
    next_trial_3.keys = undefined;
    next_trial_3.rt = undefined;
    _next_trial_3_allKeys = [];
    dep_island_26.setImage(beg_island);
    final_state_4.setImage(dplace);
    final_state_supposed_to_2.setImage(end_island);
    counter.setText((num_consecutive_correct.toString() + " correct in a row"));
    // keep track of which components have finished
    feeedback__2Components = [];
    feeedback__2Components.push(tran_selected_3);
    feeedback__2Components.push(text_21);
    feeedback__2Components.push(next_trial_3);
    feeedback__2Components.push(walking_6);
    feeedback__2Components.push(dep_island_26);
    feeedback__2Components.push(final_state_4);
    feeedback__2Components.push(final_state_supposed_to_2);
    feeedback__2Components.push(counter);
    feeedback__2Components.push(inteded_location_3);
    
    feeedback__2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function feeedback__2RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'feeedback__2'-------
    // get current time
    t = feeedback__2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *tran_selected_3* updates
    if (t >= 0 && tran_selected_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      tran_selected_3.tStart = t;  // (not accounting for frame time here)
      tran_selected_3.frameNStart = frameN;  // exact frame index
      
      tran_selected_3.setAutoDraw(true);
    }

    frameRemains = 0 + only_if_acted - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (tran_selected_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      tran_selected_3.setAutoDraw(false);
    }
    
    // *text_21* updates
    if (t >= 2 && text_21.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_21.tStart = t;  // (not accounting for frame time here)
      text_21.frameNStart = frameN;  // exact frame index
      
      text_21.setAutoDraw(true);
    }

    frameRemains = 2 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_21.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_21.setAutoDraw(false);
    }
    
    // *next_trial_3* updates
    if (t >= 1 && next_trial_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      next_trial_3.tStart = t;  // (not accounting for frame time here)
      next_trial_3.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { next_trial_3.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { next_trial_3.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { next_trial_3.clearEvents(); });
    }

    frameRemains = 1 + 6 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (next_trial_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      next_trial_3.status = PsychoJS.Status.FINISHED;
  }

    if (next_trial_3.status === PsychoJS.Status.STARTED) {
      let theseKeys = next_trial_3.getKeys({keyList: ['space'], waitRelease: false});
      _next_trial_3_allKeys = _next_trial_3_allKeys.concat(theseKeys);
      if (_next_trial_3_allKeys.length > 0) {
        next_trial_3.keys = _next_trial_3_allKeys[_next_trial_3_allKeys.length - 1].name;  // just the last key pressed
        next_trial_3.rt = _next_trial_3_allKeys[_next_trial_3_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *walking_6* updates
    if (t >= 0.0 && walking_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      walking_6.tStart = t;  // (not accounting for frame time here)
      walking_6.frameNStart = frameN;  // exact frame index
      
      walking_6.setAutoDraw(true);
    }

    frameRemains = 0.0 + walking_choice - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (walking_6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      walking_6.setAutoDraw(false);
    }
    
    // *dep_island_26* updates
    if (t >= 0.0 && dep_island_26.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dep_island_26.tStart = t;  // (not accounting for frame time here)
      dep_island_26.frameNStart = frameN;  // exact frame index
      
      dep_island_26.setAutoDraw(true);
    }

    frameRemains = 0.0 + 7 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (dep_island_26.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      dep_island_26.setAutoDraw(false);
    }
    
    // *final_state_4* updates
    if (t >= 1 && final_state_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      final_state_4.tStart = t;  // (not accounting for frame time here)
      final_state_4.frameNStart = frameN;  // exact frame index
      
      final_state_4.setAutoDraw(true);
    }

    frameRemains = 1 + 6 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (final_state_4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      final_state_4.setAutoDraw(false);
    }
    
    // *final_state_supposed_to_2* updates
    if (t >= 0 && final_state_supposed_to_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      final_state_supposed_to_2.tStart = t;  // (not accounting for frame time here)
      final_state_supposed_to_2.frameNStart = frameN;  // exact frame index
      
      final_state_supposed_to_2.setAutoDraw(true);
    }

    frameRemains = 0 + 7 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (final_state_supposed_to_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      final_state_supposed_to_2.setAutoDraw(false);
    }
    
    // *counter* updates
    if (t >= 1 && counter.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      counter.tStart = t;  // (not accounting for frame time here)
      counter.frameNStart = frameN;  // exact frame index
      
      counter.setAutoDraw(true);
    }

    frameRemains = 1 + miss_or - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (counter.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      counter.setAutoDraw(false);
    }
    
    // *inteded_location_3* updates
    if (t >= 0.0 && inteded_location_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      inteded_location_3.tStart = t;  // (not accounting for frame time here)
      inteded_location_3.frameNStart = frameN;  // exact frame index
      
      inteded_location_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 7 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (inteded_location_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      inteded_location_3.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    feeedback__2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function feeedback__2RoutineEnd() {
  return async function () {
    //------Ending Routine 'feeedback__2'-------
    feeedback__2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(next_trial_3.corr, level);
    }
    psychoJS.experiment.addData('next_trial_3.keys', next_trial_3.keys);
    if (typeof next_trial_3.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('next_trial_3.rt', next_trial_3.rt);
        routineTimer.reset();
        }
    
    next_trial_3.stop();
    if ((miss_sometimes === false)){
        if ((see_actions.thisRepN > 15)) {
            psychoJS.quit({message: 'You have failed the attention check and therefore cannot proceed with the study'});
        }
    }
    if ((miss_sometimes === false)) {
        if ((num_consecutive_correct >= 5)) {
            see_actions.finished = true;
        }
    }
    
    // the Routine "feeedback__2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _ready_allKeys;
var nm;
var plane_selected;
var selected_object;
var success_on;
var action_prepComponents;
function action_prepRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'action_prep'-------
    t = 0;
    action_prepClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(10.000000);
    // update component parameters for each repeat
    warning.alignHoriz = "left";
    if ((set_actions === 1)) {
        text = "You will now try and catch your moving ride by pressing space when it is exactly in the center across the screen.\n\n Press space to continue";
    } else {
        if ((set_actions === 2)) {
            if ((platform_examples.thisN === 0)) {
                text = "Now we will try jumping from a WIDE platform.\n\n Your goal is to press space when the vehicle is exactly in the middle of the screen\n\nPress space to continue";
            } else {
                if ((platform_examples.thisN === 3)) {
                    text = "Now we will try jumping from a MEDIUM platform.\n\n Your goal is to press space when the vehicle is exactly in the middle of the screen\n\nPress space to continue";
                } else {
                    if ((platform_examples.thisN === 6)) {
                        text = "Now we will try jumping from a NARROW (hard) platform.\n\n Your goal is to press space when the vehicle is exactly in the middle of the screen\n\nPress space to continue";
                    }
                }
            }
        } else {
            if ((set_actions === 3)) {
                if ((additional_section.thisN < 2)) {
                    if (((ext_platform.thisN === 0) && (additional_section.thisN === 0))) {
                        text = "Let us see an example where the PLATFORM is NARROW, but the LOADING AREA is LONG!";
                    } else {
                        text = "Press space to jump from the additional section";
                    }
                } else {
                    if (((ext_platform.thisN === 0) && (additional_section.thisN === 2))) {
                        text = "Let us see an example where the PLATFORM is SHORT, and the LOADING AREA is SHORT";
                    } else {
                        text = "Press space to jump from the LOADING AREA";
                    }
                }
            }
        }
    }
    
    warning.setText(text);
    ready.keys = undefined;
    ready.rt = undefined;
    _ready_allKeys = [];
    
    nm = randint(0, 2);
    plane_selected = transport[nm];
    if ((plane_selected === plane)) {
        selected_object = "plane";
    } else {
        if ((plane_selected === train)) {
            selected_object = "train";
        }
    }
    success_on = [];
    
    // keep track of which components have finished
    action_prepComponents = [];
    action_prepComponents.push(warning);
    action_prepComponents.push(ready);
    
    action_prepComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function action_prepRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'action_prep'-------
    // get current time
    t = action_prepClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *warning* updates
    if (t >= 0.0 && warning.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      warning.tStart = t;  // (not accounting for frame time here)
      warning.frameNStart = frameN;  // exact frame index
      
      warning.setAutoDraw(true);
    }

    frameRemains = 0.0 + 10 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (warning.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      warning.setAutoDraw(false);
    }
    
    // *ready* updates
    if (t >= 0.0 && ready.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ready.tStart = t;  // (not accounting for frame time here)
      ready.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { ready.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { ready.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { ready.clearEvents(); });
    }

    frameRemains = 0.0 + 10 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (ready.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      ready.status = PsychoJS.Status.FINISHED;
  }

    if (ready.status === PsychoJS.Status.STARTED) {
      let theseKeys = ready.getKeys({keyList: ['space'], waitRelease: false});
      _ready_allKeys = _ready_allKeys.concat(theseKeys);
      if (_ready_allKeys.length > 0) {
        ready.keys = _ready_allKeys[_ready_allKeys.length - 1].name;  // just the last key pressed
        ready.rt = _ready_allKeys[_ready_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    action_prepComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function action_prepRoutineEnd() {
  return async function () {
    //------Ending Routine 'action_prep'-------
    action_prepComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(ready.corr, level);
    }
    psychoJS.experiment.addData('ready.keys', ready.keys);
    if (typeof ready.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('ready.rt', ready.rt);
        routineTimer.reset();
        }
    
    ready.stop();
    return Scheduler.Event.NEXT;
  };
}


var cueSize;
var cuePos;
var pathTime;
var _action_allKeys;
var action_executionComponents;
function action_executionRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'action_execution'-------
    t = 0;
    action_executionClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    yScale = 0.45;
    minSize = 0.1;
    maxSize = 0.1;
    pathStart = [(- 1), (- 0.9)];
    pathN = 0;
    xScale = ((psychoJS.window.size[0] / psychoJS.window.size[1]) * 0.45);
    posClock = new util.Clock();
    sizeClock = new util.Clock();
    cueSize = minSize;
    cuePos = pathStart;
    posClock.reset();
    sizeClock.reset();
    pathTime = 1;
    moving_cue_9.setImage('planes/train.png');
    action.keys = undefined;
    action.rt = undefined;
    _action_allKeys = [];
    // keep track of which components have finished
    action_executionComponents = [];
    action_executionComponents.push(moving_cue_9);
    action_executionComponents.push(action);
    
    action_executionComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


var pathEnd;
function action_executionRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'action_execution'-------
    // get current time
    t = action_executionClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    if ((action.keys === "space")) {
        current_pos = cuePos;
        //continueRoutine = false;
    }
    
    pathEnd = [1, (- 0.95)];
    cuePos = [(xScale * (pathStart[0] + (((Number.parseFloat(pathEnd[0]) - pathStart[0]) * posClock.getTime()) / Number.parseFloat(pathTime)))), (yScale * (pathStart[1] + (((Number.parseFloat(pathEnd[1]) - pathStart[1]) * posClock.getTime()) / Number.parseFloat(pathEnd[1]))))];
    
    
    // *moving_cue_9* updates
    if (t >= 0.0 && moving_cue_9.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      moving_cue_9.tStart = t;  // (not accounting for frame time here)
      moving_cue_9.frameNStart = frameN;  // exact frame index
      
      moving_cue_9.setAutoDraw(true);
    }

    
    if (moving_cue_9.status === PsychoJS.Status.STARTED){ // only update if being drawn
      moving_cue_9.setPos(cuePos, false);
    }
    
    // *action* updates
    if (t >= 0.2 && action.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      action.tStart = t;  // (not accounting for frame time here)
      action.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { action.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { action.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { action.clearEvents(); });
    }

    if (action.status === PsychoJS.Status.STARTED) {
      let theseKeys = action.getKeys({keyList: ['space'], waitRelease: false});
      _action_allKeys = _action_allKeys.concat(theseKeys);
      if (_action_allKeys.length > 0) {
        action.keys = _action_allKeys[_action_allKeys.length - 1].name;  // just the last key pressed
        action.rt = _action_allKeys[_action_allKeys.length - 1].rt;
        // was this correct?
        if (action.keys == '') {
            action.corr = 1;
        } else {
            action.corr = 0;
        }
      }
    }
    
    if ((t > (1 + 0.1))) {
        if ((action.keys === undefined)) {
            current_pos = [10, 10];
        }
        continueRoutine = false;
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    action_executionComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function action_executionRoutineEnd() {
  return async function () {
    //------Ending Routine 'action_execution'-------
    action_executionComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // was no response the correct answer?!
    if (action.keys === undefined) {
      if (['None','none',undefined].includes('')) {
         action.corr = 1;  // correct non-response
      } else {
         action.corr = 0;  // failed to respond (incorrectly)
      }
    }
    // store data for current loop
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(action.corr, level);
    }
    psychoJS.experiment.addData('action.keys', action.keys);
    psychoJS.experiment.addData('action.corr', action.corr);
    if (typeof action.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('action.rt', action.rt);
        }
    
    action.stop();
    // the Routine "action_execution" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var allowed_area;
var w_self;
var judge;
var percent_acc;
var per;
var transp;
var got;
var _key_resp_18_allKeys;
var feedbackComponents;
function feedbackRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'feedback'-------
    t = 0;
    feedbackClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    if ((set_actions === 2)) {
        if ((platform_examples.thisN < 2)) {
            allowed_area = 0.3;
            w_self = 0.95;
            judge = "LENIENT officer ";
        } else {
            if ((platform_examples.thisN < 4)) {
                allowed_area = 0.1;
                w_self = 0.6;
                judge = "medium officer ";
            } else {
                if ((platform_examples.thisN < 6)) {
                    w_self = 0.1;
                    allowed_area = 0.01;
                    judge = "hard officer ";
                }
            }
        }
        text_3.alignHoriz = "left";
    } else {
        if (((additional_section.thisN + (1 % 2)) === 0)) {
            w_self = 0.1;
        }
    }
    
    
    
    if ((performance_arr.length >1)) {
        percent_acc = ecdfArray(performance_arr);
        per = percent_acc(Math.abs((0.3 - action.rt)));
    }
    
    
    
    if ((Math.abs(Math.abs((0.3 - action.rt))) < allowed_area)) {
        success = 1;
    } else {
        success = 0;
    }
    
    if ((plane_selected === plane)) {
        transp = "plane";
    } else {
        transp = "train";
    }
    if ((success === 1)) {
        got = ("Success! you were timely enough to catch the " + transp.toString());
    } else {
        got = ("Sorry. You were NOT timely enough to catch the " + transp.toString());
    }
    if ((action.keys === undefined)) {
        action.keys = [];
        action.rt = [];
    } else {
        performance_arr.push(Math.abs(.3-action.rt));
    }
    text_3.setText(got);
    key_resp_18.keys = undefined;
    key_resp_18.rt = undefined;
    _key_resp_18_allKeys = [];
    psychoJS.experiment.addData("position", Math.abs((0.3 - action.rt)));
    psychoJS.experiment.addData("cdf", per);
    
    // keep track of which components have finished
    feedbackComponents = [];
    feedbackComponents.push(text_3);
    feedbackComponents.push(key_resp_18);
    feedbackComponents.push(text_26);
    
    feedbackComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function feedbackRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'feedback'-------
    // get current time
    t = feedbackClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_3* updates
    if (t >= 0 && text_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_3.tStart = t;  // (not accounting for frame time here)
      text_3.frameNStart = frameN;  // exact frame index
      
      text_3.setAutoDraw(true);
    }

    
    // *key_resp_18* updates
    if (t >= 0.0 && key_resp_18.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_18.tStart = t;  // (not accounting for frame time here)
      key_resp_18.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_18.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_18.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_18.clearEvents(); });
    }

    if (key_resp_18.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_18.getKeys({keyList: ['space'], waitRelease: false});
      _key_resp_18_allKeys = _key_resp_18_allKeys.concat(theseKeys);
      if (_key_resp_18_allKeys.length > 0) {
        key_resp_18.keys = _key_resp_18_allKeys[_key_resp_18_allKeys.length - 1].name;  // just the last key pressed
        key_resp_18.rt = _key_resp_18_allKeys[_key_resp_18_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *text_26* updates
    if (t >= 1 && text_26.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_26.tStart = t;  // (not accounting for frame time here)
      text_26.frameNStart = frameN;  // exact frame index
      
      text_26.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    feedbackComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function feedbackRoutineEnd() {
  return async function () {
    //------Ending Routine 'feedback'-------
    feedbackComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(key_resp_18.corr, level);
    }
    psychoJS.experiment.addData('key_resp_18.keys', key_resp_18.keys);
    if (typeof key_resp_18.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_18.rt', key_resp_18.rt);
        routineTimer.reset();
        }
    
    key_resp_18.stop();
    // the Routine "feedback" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var text_to;
var gotValidClick;
var time_to_show;
var open_questionsComponents;
function open_questionsRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'open_questions'-------
    t = 0;
    open_questionsClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    text_to = "Do you have any questions or feedback about any parts of the game?\n\n Response must be a minimum of two sentences.";
    document.body.style.cursor = "auto";
    
    textbox.setText('');
    textbox.refresh();
    textbox.setText('Enter text here\n');
    // setup some python lists for storing info about the mouse
    mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    text_8.setText(text_to);
    if ((trials_review.thisN === 0)) {
        time_to_show = 0;
    } else {
        if ((trials_review.thisN > 0)) {
            time_to_show = 100000;
        }
    }
    please_write_more.alignHoriz = "left";
    
    // keep track of which components have finished
    open_questionsComponents = [];
    open_questionsComponents.push(textbox);
    open_questionsComponents.push(text_7);
    open_questionsComponents.push(mouse);
    open_questionsComponents.push(text_8);
    open_questionsComponents.push(please_write_more);
    
    open_questionsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


var prevButtonState;
var _mouseButtons;
function open_questionsRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'open_questions'-------
    // get current time
    t = open_questionsClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *textbox* updates
    if (t >= 0.0 && textbox.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      textbox.tStart = t;  // (not accounting for frame time here)
      textbox.frameNStart = frameN;  // exact frame index
      
      textbox.setAutoDraw(true);
    }

    
    // *text_7* updates
    if (t >= 0.0 && text_7.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_7.tStart = t;  // (not accounting for frame time here)
      text_7.frameNStart = frameN;  // exact frame index
      
      text_7.setAutoDraw(true);
    }

    // *mouse* updates
    if (t >= 0.0 && mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse.tStart = t;  // (not accounting for frame time here)
      mouse.frameNStart = frameN;  // exact frame index
      
      mouse.status = PsychoJS.Status.STARTED;
      mouse.mouseClock.reset();
      prevButtonState = mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [text_7]) {
            if (obj.contains(mouse)) {
              gotValidClick = true;
              mouse.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
    }
    
    // *text_8* updates
    if (t >= 0.0 && text_8.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_8.tStart = t;  // (not accounting for frame time here)
      text_8.frameNStart = frameN;  // exact frame index
      
      text_8.setAutoDraw(true);
    }

    
    // *please_write_more* updates
    if (t >= 0.0 && please_write_more.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      please_write_more.tStart = t;  // (not accounting for frame time here)
      please_write_more.frameNStart = frameN;  // exact frame index
      
      please_write_more.setAutoDraw(true);
    }

    frameRemains = 0.0 + time_to_show - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (please_write_more.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      please_write_more.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    open_questionsComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var _mouseXYs;
function open_questionsRoutineEnd() {
  return async function () {
    //------Ending Routine 'open_questions'-------
    open_questionsComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('textbox.text',textbox.text)
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = mouse.getPos();
    _mouseButtons = mouse.getPressed();
    psychoJS.experiment.addData('mouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse.rightButton', _mouseButtons[2]);
    if (mouse.clicked_name.length > 0) {
      psychoJS.experiment.addData('mouse.clicked_name', mouse.clicked_name[0]);}
    if ((textbox.text.length > 30)) {
        trials_review.finished = true;
    }
    let practice_end = new Date().toLocaleTimeString();
    psychoJS.experiment.addData("instructions_ended", practice_end);
    
    // the Routine "open_questions" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _key_resp_4_allKeys;
var let_the_game_beginComponents;
function let_the_game_beginRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'let_the_game_begin'-------
    t = 0;
    let_the_game_beginClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(60.000000);
    // update component parameters for each repeat
    console.log(("total_wrong" + num_wrong.toString()));
    
    psychoJS.experiment.addData("total_num_wrong", num_wrong);
    if ((num_wrong > 7)) {
        psychoJS.quit({message: 'Sorry you failed too many quizz questions. You cannot continue this study. Please return it since you will not be paid for your continued time'});
        psychoJS.experiment.addData("failed_test", 1);
    
    
    }
    
    key_resp_4.keys = undefined;
    key_resp_4.rt = undefined;
    _key_resp_4_allKeys = [];
    // keep track of which components have finished
    let_the_game_beginComponents = [];
    let_the_game_beginComponents.push(text_6);
    let_the_game_beginComponents.push(key_resp_4);
    
    let_the_game_beginComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function let_the_game_beginRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'let_the_game_begin'-------
    // get current time
    t = let_the_game_beginClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_6* updates
    if (t >= 0.0 && text_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_6.tStart = t;  // (not accounting for frame time here)
      text_6.frameNStart = frameN;  // exact frame index
      
      text_6.setAutoDraw(true);
    }

    frameRemains = 0.0 + 60 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_6.setAutoDraw(false);
    }
    
    // *key_resp_4* updates
    if (t >= 0.0 && key_resp_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_4.tStart = t;  // (not accounting for frame time here)
      key_resp_4.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_4.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_4.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_4.clearEvents(); });
    }

    frameRemains = 0.0 + 60 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (key_resp_4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      key_resp_4.status = PsychoJS.Status.FINISHED;
  }

    if (key_resp_4.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_4.getKeys({keyList: ['y', 'n', 'left', 'right', 'space'], waitRelease: false});
      _key_resp_4_allKeys = _key_resp_4_allKeys.concat(theseKeys);
      if (_key_resp_4_allKeys.length > 0) {
        key_resp_4.keys = _key_resp_4_allKeys[_key_resp_4_allKeys.length - 1].name;  // just the last key pressed
        key_resp_4.rt = _key_resp_4_allKeys[_key_resp_4_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    let_the_game_beginComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function let_the_game_beginRoutineEnd() {
  return async function () {
    //------Ending Routine 'let_the_game_begin'-------
    let_the_game_beginComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(key_resp_4.corr, level);
    }
    psychoJS.experiment.addData('key_resp_4.keys', key_resp_4.keys);
    if (typeof key_resp_4.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_4.rt', key_resp_4.rt);
        routineTimer.reset();
        }
    
    key_resp_4.stop();
    return Scheduler.Event.NEXT;
  };
}


var l1;
var l2;
var l3;
var l4;
var l5;
var l6;
var l7;
var l8;
var l9;
var l10;
var shuffledArray;
var num_blocks;
var trial_length;
var color_back;
var percentageOfOnes;
var percentageOfTwos;
var percentageOfThrees;
var single_ticket_success;
var two_ticket_success;
var three_ticket_success;
var init_blockComponents;
function init_blockRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'init_block'-------
    t = 0;
    init_blockClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    l1 = [(0.18), (0.38), (0.95)];
    l2 = [(.4), (.16), (.16)];
    l3 = [(1 / 225), (45 / 225), (110 / 225)];
    l4 = [(28 / 225), (28 / 225), (28 / 225)];
    
    l5 = [(28 / 225), (128 / 225), (38 / 225)];
    l6 = [(130 / 225), (45 / 225), (110 / 225)];
    l7 = [(128 / 225), (28 / 225), (28 / 225)];
    l8 = [(255/255),(222/255),(222/255)];
    l9= [(236/255),(255/255),(220/255)];
    l10=[(242/255),(204/255),(132/255)];
    
    //w_self = w_self_exp[block.thisN];
    //w_env = w_env_exp[block.thisN];
    //w_envs=1;
    //w_envs=datasub[which_four*4+block.thisRepN]['w_env'];  // set w_env
    //w_self=datasub[which_four*4+block.thisRepN]['w_self'];  // set w_self
    //theoretical_mean_ev=datasub[which_four*4+block.thisN]['overall_ev'];  // set w_self
    //optimal_actions=datasub[which_four*4+block.thisN]['type'];  // set w_self
    //ev1=datasub[which_four*4+block.thisN]['ev1'];  // set w_self
    //ev2=datasub[which_four*4+block.thisN]['ev2'];  // set w_self
    //ev3=datasub[which_four*4+block.thisN]['ev3'];  // set w_self
    
    
        
    //part_id +=20; 
    console.log('session is ' + part_id);
    //c_inelastic=datasub[part_id*4+block.thisRepN]['w_env'];  // set w_env
    //c_elastic=datasub[part_id*4+block.thisRepN]['w_self'];  // set w_self
    console.log("c_inelastic is "+ c_inelastic);
    console.log("c_elastic is "+ c_elastic);
    
    //theoretical_mean_ev=datasub[which_four*4+block.thisN]['overall_ev'];  // set w_self
    //optimal_actions=datasub[which_four*4+block.thisN]['type'];  // set w_self
    
    
    
    //w_env=w_envs;
    // Initialize the vector with all zeros
    let vector = [];
    
    for(let i = 0; i < 6; i++) {
      // generate a subarray of 4 ones followed by a zero
      let subarray = Array(4).fill(1);
      subarray.push(0);
      
      // shuffle the subarray randomly
      for(let j = subarray.length - 1; j > 0; j--) {
        const k = Math.floor(Math.random() * (j + 1));
        [subarray[j], subarray[k]] = [subarray[k], subarray[j]];
      }
      
      // add the subarray to the vector
      vector = vector.concat(subarray);
    }
    
    console.log(vector); 
    shuffledArray=vector;
    
    polygon_2.setFillColor(new util.Color(color_back));
    function generateVectors(fractionOnes) {
      var combinedVector = [];
    
      // Generate 3 vectors
      for (var i = 0; i < 3; i++) {
        var vector = generateVector(fractionOnes);
        combinedVector = combinedVector.concat(vector);
      }
    
      return combinedVector;
    }
    
    // Function to generate a vector with the specified specifications
    function generateVector(fractionOnes) {
      var vector = [];
    
      // Calculate the desired number of ones for the total vector
      var totalOnes = Math.floor(fractionOnes * 10);
    
      // Calculate the number of ones for the first sub-vector
      var onesSubVector1 = Math.floor(totalOnes / 2);
    
      // Generate the first sub-vector
      var subVector1 = generateSubVector(onesSubVector1);
      shuffleSubVector(subVector1, 3); // Shuffle the sub-vector three times
    
      // Calculate the number of ones for the second sub-vector
      var onesSubVector2 = totalOnes - onesSubVector1;
    
      // Generate the second sub-vector
      var subVector2 = generateSubVector(onesSubVector2);
      shuffleSubVector(subVector2, 3); // Shuffle the sub-vector three times
    
      // Alternate between combining the sub-vectors in different orders
      if (Math.random() < 0.5) {
        vector = vector.concat(subVector1, subVector2);
      } else {
        vector = vector.concat(subVector2, subVector1);
      }
    
      return vector;
    }
    
    // Function to generate a sub-vector with the desired number of ones
    function generateSubVector(onesCount) {
      var subVector = [];
      for (var i = 0; i < onesCount; i++) {
        subVector.push(1);
      }
      while (subVector.length < 5) {
        subVector.push(0);
      }
      return subVector;
    }
    
    // Function to shuffle a sub-vector randomly a specified number of times
    function shuffleSubVector(subVector, numShuffles) {
      for (var i = 0; i < numShuffles; i++) {
        shuffleVector(subVector);
      }
    }
    
    // Function to shuffle a vector randomly
    function shuffleVector(vector) {
      for (var i = vector.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = vector[i];
        vector[i] = vector[j];
        vector[j] = temp;
      }
    }
    
    
    num_blocks = 10;
    if ((block.thisN < 6)) {
        trial_length = 15;
    } else {
        trial_length = 30;
    }
    if (((block.thisN === 0) || (block.thisN === 4))) {
        c_elastic = 0.0;
        c_inelastic = 0.9;
    } else {
        if (((block.thisN === 1) || (block.thisN === 3))) {
            c_elastic = 0.9;
            c_inelastic = 0.0;
        } else {
            if (((block.thisN === 2) || (block.thisN === 5))) {
                c_elastic = 0.1;
                c_inelastic = 0.1;
            } else {
                if ((block.thisN === 6)) {
                    c_elastic = 0.34;
                    c_inelastic = 0.33;
                } else {
                    c_inelastic = datasub[(((part_id * 3) + block.thisN) - 7)]["c_inelastic"];
                    c_elastic = datasub[(((part_id * 3) + block.thisN) - 7)]["c_elastic"];
                }
            }
        }
    }
    util.shuffle(l1);
    if ((block.thisN === 0)) {
        color_back = l1;
    } else {
        if ((block.thisN === 1)) {
            color_back = l2;
        } else {
            if ((block.thisN === 2)) {
                color_back = l3;
            } else {
                if ((block.thisN === 3)) {
                    color_back = l4;
                } else {
                    if ((block.thisN === 4)) {
                        color_back = l5;
                    } else {
                        if ((block.thisN === 5)) {
                            color_back = l6;
                        } else {
                            if ((block.thisN === 6)) {
                                color_back = l7;
                            } else {
                                if ((block.thisN === 7)) {
                                    color_back = l8;
                                } else {
                                    if ((block.thisN === 8)) {
                                        color_back = l9;
                                    } else {
                                        if ((block.thisN === 9)) {
                                            color_back = l10;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    in_task = true;
    
    percentageOfOnes = c_inelastic;
    percentageOfTwos =   (c_inelastic+c_elastic/2);
    percentageOfThrees = (c_inelastic+c_elastic);
    
    single_ticket_success = generateVectors(percentageOfOnes);
    two_ticket_success = generateVectors(percentageOfTwos);
    three_ticket_success = generateVectors(percentageOfThrees);
    
    psychoJS.experiment.addData("single_ticket_sucess", single_ticket_success);
    psychoJS.experiment.addData("two_ticket_sucess", two_ticket_success);
    psychoJS.experiment.addData("three_ticket_sucess", three_ticket_success);
    
    // keep track of which components have finished
    init_blockComponents = [];
    init_blockComponents.push(polygon_2);
    
    init_blockComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function init_blockRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'init_block'-------
    // get current time
    t = init_blockClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *polygon_2* updates
    if (t >= 0.0 && polygon_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon_2.tStart = t;  // (not accounting for frame time here)
      polygon_2.frameNStart = frameN;  // exact frame index
      
      polygon_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (polygon_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      polygon_2.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    init_blockComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function init_blockRoutineEnd() {
  return async function () {
    //------Ending Routine 'init_block'-------
    init_blockComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "init_block" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _key_resp_first_allKeys;
var practice_in_taskComponents;
function practice_in_taskRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'practice_in_task'-------
    t = 0;
    practice_in_taskClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    if ((block.thisN > 5)) {
        practice_task.finished = true;
        continueRoutine = false;
    }
    
    console.log(("current_slide " + start_with.toString()));
    if ((c_elastic === 0.9)) {
        if ((practice_task.thisN === 0)) {
            start_with = 49;
        }
        if (((key_resp_first.keys === "right") && (start_with < 52))) {
            start_with += 1;
        } else {
            if (((key_resp_first.keys === "left") && (start_with > 50))) {
                start_with -= 1;
            }
        }
    }
    if ((c_inelastic === 0.9)) {
        if ((practice_task.thisN === 0)) {
            start_with = 53;
        }
        if (((key_resp_first.keys === "right") && (start_with < 56))) {
            start_with += 1;
        } else {
            if (((key_resp_first.keys === "left") && (start_with > 53))) {
                start_with -= 1;
            }
        }
    }
    if (((c_inelastic < 0.3) && (c_elastic < 0.3))) {
        if ((practice_task.thisN === 0)) {
            start_with = 56;
        }
        if (((key_resp_first.keys === "right") && (start_with < 59))) {
            start_with += 1;
        } else {
            if (((key_resp_first.keys === "left") && (start_with > 57))) {
                start_with -= 1;
            }
        }
    }
    
    image_7.setImage((("instr_new_draft/Slide" + start_with.toString()) + ".jpeg"));
    key_resp_first.keys = undefined;
    key_resp_first.rt = undefined;
    _key_resp_first_allKeys = [];
    // keep track of which components have finished
    practice_in_taskComponents = [];
    practice_in_taskComponents.push(image_7);
    practice_in_taskComponents.push(key_resp_first);
    
    practice_in_taskComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function practice_in_taskRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'practice_in_task'-------
    // get current time
    t = practice_in_taskClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *image_7* updates
    if (t >= 0.0 && image_7.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      image_7.tStart = t;  // (not accounting for frame time here)
      image_7.frameNStart = frameN;  // exact frame index
      
      image_7.setAutoDraw(true);
    }

    
    // *key_resp_first* updates
    if (t >= 0.0 && key_resp_first.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_first.tStart = t;  // (not accounting for frame time here)
      key_resp_first.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_first.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_first.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_first.clearEvents(); });
    }

    if (key_resp_first.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_first.getKeys({keyList: ['left', 'right'], waitRelease: false});
      _key_resp_first_allKeys = _key_resp_first_allKeys.concat(theseKeys);
      if (_key_resp_first_allKeys.length > 0) {
        key_resp_first.keys = _key_resp_first_allKeys[_key_resp_first_allKeys.length - 1].name;  // just the last key pressed
        key_resp_first.rt = _key_resp_first_allKeys[_key_resp_first_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    practice_in_taskComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function practice_in_taskRoutineEnd() {
  return async function () {
    //------Ending Routine 'practice_in_task'-------
    practice_in_taskComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    if ((c_elastic === 0.9)) {
        if (((start_with === 52) && (key_resp_first.keys === "right"))) {
            practice_task.finished = true;
            continueRoutine = false;
        }
    }
    if ((c_inelastic === 0.9)) {
        if (((start_with === 56) && (key_resp_first.keys === "right"))) {
            practice_task.finished = true;
            continueRoutine = false;
        }
    }
    if (((c_inelastic < 0.3) && (c_elastic < 0.3))) {
        if (((start_with === 59) && (key_resp_first.keys === "right"))) {
            practice_task.finished = true;
            continueRoutine = false;
        }
    }
    
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(key_resp_first.corr, level);
    }
    psychoJS.experiment.addData('key_resp_first.keys', key_resp_first.keys);
    if (typeof key_resp_first.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_first.rt', key_resp_first.rt);
        routineTimer.reset();
        }
    
    key_resp_first.stop();
    // the Routine "practice_in_task" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var correct_mat;
var show_which;
var times_which;
var answer_one;
var _test_action_answer_allKeys;
var check_action_understandingComponents;
function check_action_understandingRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'check_action_understanding'-------
    t = 0;
    check_action_understandingClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    if ((block.thisN > 5)) {
        practice_quiz.finished = true;
        repeat_quiz.finished = true;
        continueRoutine = false;
    }
    answer_2.alignHoriz = "left";
    if ((practice_quiz.thisN === 0)) {
        text_to_show = "In the next planet, ON AVERAGE, your ride will stop for you";
        correct_mat = "C";
        show_which = 3;
        times_which = 35;
        answer_one = "A) Frequently\n\n B) Sometimes\n\n C) Rarely";
    } else {
        if ((practice_quiz.thisN === 1)) {
            text_to_show = "In the next planet, ON AVERAGE, how frequently does your jump from the PUBLIC PLATFORM succeed?";
            correct_mat = "A";
            times_which = 35;
            answer_one = "A) Frequently\n\n B) Sometimes\n\n C) Rarely";
            show_which = 1;
        } else {
            if ((practice_quiz.thisN === 2)) {
                text_to_show = "In the next planet, ON AVERAGE, how frequently does your jump from the LOADING STATION succeed?";
                correct_mat = "A";
                times_which = 35;
                answer_one = "A) Frequently\n\n B) Sometimes\n\n C) Rarely";
                show_which = 2;
            } else {
                times_which = 0;
                if ((corr_total >= 3)) {
                    text_to_show = "Nice job. lets proceed to the practice planet\n\n Press space to continue";
                    answer_one = "";
                    show_which = 1;
                } else {
                    text_to_show = "Seems like something was not clear. Lets do another review\n\nPress space to continue";
                    answer_one = "";
                }
            }
        }
    }
    
    test_q_2.setText(text_to_show);
    test_action_answer.keys = undefined;
    test_action_answer.rt = undefined;
    _test_action_answer_allKeys = [];
    new_platform_5.setImage((("distinguiish_actions/Slide" + show_which.toString()) + ".jpeg"));
    answer_2.setText(answer_one);
    // keep track of which components have finished
    check_action_understandingComponents = [];
    check_action_understandingComponents.push(test_q_2);
    check_action_understandingComponents.push(test_action_answer);
    check_action_understandingComponents.push(new_platform_5);
    check_action_understandingComponents.push(answer_2);
    
    check_action_understandingComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function check_action_understandingRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'check_action_understanding'-------
    // get current time
    t = check_action_understandingClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *test_q_2* updates
    if (t >= 0.0 && test_q_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      test_q_2.tStart = t;  // (not accounting for frame time here)
      test_q_2.frameNStart = frameN;  // exact frame index
      
      test_q_2.setAutoDraw(true);
    }

    
    // *test_action_answer* updates
    if (t >= 0.0 && test_action_answer.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      test_action_answer.tStart = t;  // (not accounting for frame time here)
      test_action_answer.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { test_action_answer.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { test_action_answer.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { test_action_answer.clearEvents(); });
    }

    if (test_action_answer.status === PsychoJS.Status.STARTED) {
      let theseKeys = test_action_answer.getKeys({keyList: ['a', 'b', 'c', 'd', 'space'], waitRelease: false});
      _test_action_answer_allKeys = _test_action_answer_allKeys.concat(theseKeys);
      if (_test_action_answer_allKeys.length > 0) {
        test_action_answer.keys = _test_action_answer_allKeys[_test_action_answer_allKeys.length - 1].name;  // just the last key pressed
        test_action_answer.rt = _test_action_answer_allKeys[_test_action_answer_allKeys.length - 1].rt;
        // was this correct?
        if (test_action_answer.keys == correct_mat) {
            test_action_answer.corr = 1;
        } else {
            test_action_answer.corr = 0;
        }
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *new_platform_5* updates
    if (t >= 0.0 && new_platform_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      new_platform_5.tStart = t;  // (not accounting for frame time here)
      new_platform_5.frameNStart = frameN;  // exact frame index
      
      new_platform_5.setAutoDraw(true);
    }

    frameRemains = 0.0 + times_which - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (new_platform_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      new_platform_5.setAutoDraw(false);
    }
    
    // *answer_2* updates
    if (t >= 0.0 && answer_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      answer_2.tStart = t;  // (not accounting for frame time here)
      answer_2.frameNStart = frameN;  // exact frame index
      
      answer_2.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    check_action_understandingComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function check_action_understandingRoutineEnd() {
  return async function () {
    //------Ending Routine 'check_action_understanding'-------
    check_action_understandingComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    if ((c_elastic === 0.9)) {
        if ((practice_quiz.thisN === 0)) {
            if ((test_action_answer.keys === "c")) {
                corr_total += 1;
            } else {
                corr_total = 0;
            }
        } else {
            if ((practice_quiz.thisN === 1)) {
                if ((test_action_answer.keys === "c")) {
                    corr_total += 1;
                } else {
                    corr_total = 0;
                }
            } else {
                if ((practice_quiz.thisN === 2)) {
                    if ((test_action_answer.keys === "a")) {
                        corr_total += 1;
                    } else {
                        corr_total = 0;
                    }
                } else {
                    if ((practice_quiz.thisN === 3)) {
                        if ((corr_total >= 3)) {
                            repeat_quiz.finished = true;
                            console.log("it works");
                        } else {
                            start_with = 48;
                            corr_total = 0;
                        }
                    }
                }
            }
        }
    }
    if ((c_inelastic === 0.9)) {
        if ((practice_quiz.thisN === 0)) {
            if ((test_action_answer.keys === "a")) {
                corr_total += 1;
            } else {
                corr_total = 0;
            }
        } else {
            if ((practice_quiz.thisN === 1)) {
                if ((test_action_answer.keys === "c")) {
                    corr_total += 1;
                } else {
                    corr_total = 0;
                }
            } else {
                if ((practice_quiz.thisN === 2)) {
                    if ((test_action_answer.keys === "c")) {
                        corr_total += 1;
                    } else {
                        corr_total = 0;
                    }
                } else {
                    if ((practice_quiz.thisN === 3)) {
                        if ((corr_total >= 3)) {
                            repeat_quiz.finished = true;
                            console.log("it works");
                            corr_total = 0;
                        } else {
                            corr_total = 0;
                            start_with = 52;
                        }
                    }
                }
            }
        }
    }
    if (((c_inelastic < 0.3) && (c_elastic < 0.3))) {
        if ((practice_quiz.thisN === 0)) {
            if ((test_action_answer.keys === "c")) {
                corr_total += 1;
            } else {
                corr_total = 0;
            }
        } else {
            if ((practice_quiz.thisN === 1)) {
                if ((test_action_answer.keys === "c")) {
                    corr_total += 1;
                } else {
                    corr_total = 0;
                }
            } else {
                if ((practice_quiz.thisN === 2)) {
                    if ((test_action_answer.keys === "c")) {
                        corr_total += 1;
                    } else {
                        corr_total = 0;
                    }
                } else {
                    if ((practice_quiz.thisN === 3)) {
                        if ((corr_total >= 3)) {
                            repeat_quiz.finished = true;
                            console.log("it works");
                        } else {
                            corr_total = 0;
                            start_with = 54;
                            if ((repeat_quiz.thisN > 2)) {
                                psychoJS.quit({message: 'Sorry you failed too many quiz questions. You cannot continue this study. Please return it since you will not be paid for your continued time'});
    
                            }
                        }
                    }
                }
            }
        }
    }
    
    // was no response the correct answer?!
    if (test_action_answer.keys === undefined) {
      if (['None','none',undefined].includes(correct_mat)) {
         test_action_answer.corr = 1;  // correct non-response
      } else {
         test_action_answer.corr = 0;  // failed to respond (incorrectly)
      }
    }
    // store data for current loop
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(test_action_answer.corr, level);
    }
    psychoJS.experiment.addData('test_action_answer.keys', test_action_answer.keys);
    psychoJS.experiment.addData('test_action_answer.corr', test_action_answer.corr);
    if (typeof test_action_answer.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('test_action_answer.rt', test_action_answer.rt);
        routineTimer.reset();
        }
    
    test_action_answer.stop();
    // the Routine "check_action_understanding" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var traveling_to_new_planetComponents;
function traveling_to_new_planetRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'traveling_to_new_planet'-------
    t = 0;
    traveling_to_new_planetClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(4.000000);
    // update component parameters for each repeat
    // keep track of which components have finished
    traveling_to_new_planetComponents = [];
    traveling_to_new_planetComponents.push(background_color_2);
    traveling_to_new_planetComponents.push(traveling_one);
    traveling_to_new_planetComponents.push(space_ship);
    
    traveling_to_new_planetComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function traveling_to_new_planetRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'traveling_to_new_planet'-------
    // get current time
    t = traveling_to_new_planetClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *background_color_2* updates
    if (t >= 0.0 && background_color_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background_color_2.tStart = t;  // (not accounting for frame time here)
      background_color_2.frameNStart = frameN;  // exact frame index
      
      background_color_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 4 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (background_color_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      background_color_2.setAutoDraw(false);
    }
    
    // *traveling_one* updates
    if (t >= 0 && traveling_one.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      traveling_one.tStart = t;  // (not accounting for frame time here)
      traveling_one.frameNStart = frameN;  // exact frame index
      
      traveling_one.setAutoDraw(true);
    }

    frameRemains = 0 + 4 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (traveling_one.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      traveling_one.setAutoDraw(false);
    }
    
    if (traveling_one.status === PsychoJS.Status.STARTED){ // only update if being drawn
      traveling_one.setText(("Traveling to a new planet!: " + Math.round((4 - t), 1)), false);
    }
    
    // *space_ship* updates
    if (t >= 0.0 && space_ship.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_ship.tStart = t;  // (not accounting for frame time here)
      space_ship.frameNStart = frameN;  // exact frame index
      
      space_ship.setAutoDraw(true);
    }

    frameRemains = 0.0 + 4 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (space_ship.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      space_ship.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    traveling_to_new_planetComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function traveling_to_new_planetRoutineEnd() {
  return async function () {
    //------Ending Routine 'traveling_to_new_planet'-------
    traveling_to_new_planetComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    return Scheduler.Event.NEXT;
  };
}


var be_ready;
var _key_resp_9_allKeys;
var one_or_three_2Components;
function one_or_three_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'one_or_three_2'-------
    t = 0;
    one_or_three_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(25.000000);
    // update component parameters for each repeat
    text_32.alignHoriz = "left";
    if ((block.thisN < 6)) {
        if ((trials_task.thisN === 0)) {
            be_ready = "Welcome to your new planet!\n\nNow you have a chance to practice the game. You will start with 3 free tickets to get you started\n\nPress space when ready";
        } else {
            if ((trials_task.thisN === num_3_actions)) {
                if ((c_elastic === 0.9)) {
                    be_ready = "Hopefully by now it's clear that only by purchasing 3 tickets (LOADING AREA) are you consistenly succesful in catching your ride\n\nYou will no longer receive free tickets so you need to select how many tickets you want.\n\n Press space to continue";
                } else {
                    if ((c_inelastic === 0.9)) {
                        be_ready = "Your ride actually would stop for you with 1 ticket! So purchasing extra tickets, since they do cost money, is a WASTE (that affects your real money bonus)\n\n\n\nYou will no longer receive free tickets so you need to select how many tickets you want.\nPress space to continue";
                    } else {
                        if (((c_inelastic < 0.3) && (c_elastic < 0.3))) {
                            be_ready = "Oof. Doesn't seem like the vehicle stops for you nor does purchasing extra tickets helps.\n\nIn this case purchasing tickets is a WASTE OF MONEY\n\n\n\nYou will no longer receive free tickets so you need to select how many tickets you want.\n\nPress space to continue";
                        } else {
                            continueRoutine = false;
                        }
                    }
                }
            } else {
                if (((trials_task.thisN + 1) === 11)) {
                    if ((c_elastic === 0.9)) {
                        be_ready = "Hopefully by now it's clear that only by purchasing 3 tickets (LOADING AREA) are you consistenly succesful in catching your ride\n\nPress space to continue";
                    } else {
                        if ((c_inelastic === 0.9)) {
                            be_ready = "Your ride actually would stop for you with 1 ticket! So purchasing extra tickets, is a WASTE (that affects your real money bonus)\n\nPress space to continue";
                        } else {
                            if (((c_inelastic < 0.3) && (c_elastic < 0.3))) {
                                be_ready = "Oof. Doesn't seem like the vehicle stops for you nor does purchasing tickets is a waste of money.\n\nIn this case its best to SAVE MONEY by WALKING\n\nPress space to continue";
                            }
                        }
                    }
                } else {
                    if ((((force_divergence === 0) && (trials_task.thisN > 5)) && (block.thisN > 2))) {
                        be_ready = "Notice- you may have won because walking would also take you to the treasure\n\nHowever, generally walking rarely wins you money";
                    } else {
                        continueRoutine = false;
                    }
                }
            }
        }
    } else {
        if ((trials_task.thisN === 0)) {
            be_ready = "Welcome to your new planet!\n\nNow it is up to you to figure out how this planet works\n\nRemmember that any coins you earn factors into a real money bonus of up to 5$!\n\nAs a first time visitor, you will receive 3 free tickets so that you can win if \n\na) Your ride stops for you\nOR\nb)You manage to jump from either platform\n\nIt could be however that you dont actually need to purchase 3 tickets to win\n\nPress space when ready";
        } else {
            continueRoutine = false;
        }
    }
    
    polygon_23.setFillColor(new util.Color(color_back));
    key_resp_9.keys = undefined;
    key_resp_9.rt = undefined;
    _key_resp_9_allKeys = [];
    text_32.setText(be_ready);
    // keep track of which components have finished
    one_or_three_2Components = [];
    one_or_three_2Components.push(polygon_23);
    one_or_three_2Components.push(key_resp_9);
    one_or_three_2Components.push(text_32);
    
    one_or_three_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function one_or_three_2RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'one_or_three_2'-------
    // get current time
    t = one_or_three_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *polygon_23* updates
    if (t >= 0.0 && polygon_23.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon_23.tStart = t;  // (not accounting for frame time here)
      polygon_23.frameNStart = frameN;  // exact frame index
      
      polygon_23.setAutoDraw(true);
    }

    frameRemains = 0.0 + 25 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (polygon_23.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      polygon_23.setAutoDraw(false);
    }
    
    // *key_resp_9* updates
    if (t >= 0.0 && key_resp_9.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_9.tStart = t;  // (not accounting for frame time here)
      key_resp_9.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_9.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_9.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_9.clearEvents(); });
    }

    frameRemains = 0.0 + 25 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (key_resp_9.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      key_resp_9.status = PsychoJS.Status.FINISHED;
  }

    if (key_resp_9.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_9.getKeys({keyList: ['y', 'n', 'left', 'right', 'space'], waitRelease: false});
      _key_resp_9_allKeys = _key_resp_9_allKeys.concat(theseKeys);
      if (_key_resp_9_allKeys.length > 0) {
        key_resp_9.keys = _key_resp_9_allKeys[_key_resp_9_allKeys.length - 1].name;  // just the last key pressed
        key_resp_9.rt = _key_resp_9_allKeys[_key_resp_9_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *text_32* updates
    if (t >= 0.0 && text_32.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_32.tStart = t;  // (not accounting for frame time here)
      text_32.frameNStart = frameN;  // exact frame index
      
      text_32.setAutoDraw(true);
    }

    frameRemains = 0.0 + 25 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_32.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_32.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    one_or_three_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function one_or_three_2RoutineEnd() {
  return async function () {
    //------Ending Routine 'one_or_three_2'-------
    one_or_three_2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(key_resp_9.corr, level);
    }
    psychoJS.experiment.addData('key_resp_9.keys', key_resp_9.keys);
    if (typeof key_resp_9.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_9.rt', key_resp_9.rt);
        routineTimer.reset();
        }
    
    key_resp_9.stop();
    return Scheduler.Event.NEXT;
  };
}


var spot;
var earn;
var comp_choose_loc;
var I_choose;
var force_divergence;
var letter_height;
var opt_answer;
var forced_actions;
var num_1_actions;
var num_3_actions;
var total_num_forced;
var acted_or_not;
var comp_select_time;
var num_actions;
var retry_loop;
var comp_extra_five;
var only_first_trial;
var allowed_on_opt;
var opt_in_text_shown;
var startOptTime;
var start_opt_time;
var opt_timedOut;
var first_opt;
var _opt_in_allKeys;
var opt_in_choice_3Components;
function opt_in_choice_3RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'opt_in_choice_3'-------
    t = 0;
    opt_in_choice_3Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    if (((block.thisN === 6) && (trials_task.thisN === 0))) {
        total_earned = 0;
    }
    
    //var begin_trial= new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = new Date();
    
    const trial_started = Math.floor(date.getTime() / 1000);
    
    psychoJS.experiment.addData("trial_started", trial_started);
    
    
    
    
    success_on = [];
    spot = randint(0, 1);
    earn = [-.55, 0.7];
    
    if ((spot === 0)) {
        comp_choose_loc = [- 0.75, .8];
        I_choose = [0.25, 0.8];
    
    } else {
        comp_choose_loc = [0.55, 0.8];
        I_choose = [- 0.2, 0.8];
    }
    
    
    shuffle(islands_start);
    beg_island = islands_start[0];
    
    shuffle(islands);
    shuffle(transport);
    end_island = islands[1];
    left_plane = transport[0];
    right_plane = transport[1];
    comp_choose.alignHoriz="left";
    if ((shuffledArray[trials_task.thisN]==1)){
        force_divergence=1;
    
    
    
    } else{
        force_divergence=0;
      
    
    }
    //force_divergence = randint(0, 10);
    if ((force_divergence === 1)) {
        psychoJS.experiment.addData("ss_transition", 0);
    
        if ((beg_island === "islands/hut.png")) {
            end_island = "islands/town.png";
        } else {
            end_island = "islands/mountain.png";
        }
    }
    else {
        psychoJS.experiment.addData("ss_transition", 1);
    
        if ((beg_island === "islands/hut.png")) {
            end_island = "islands/mountain.png";
        } else {
            end_island = "islands/town.png";
        }
        
        
        
    }
    
    
    
    letter_height=.075
    opt_answer=0
    
    
    psychoJS.experiment.addData("c_inelastic", c_inelastic);
    psychoJS.experiment.addData("c_elastic",c_elastic);
    
    forced_actions = false;
    num_1_actions = 0;
    if ((block.thisN < 6)) {
        num_3_actions = 4;
    } else {
        num_3_actions = 5;
    }
    total_num_forced = (num_1_actions + num_3_actions);
    if ((trials_task.thisN < num_3_actions)) {
        forced_actions = true;
        cs = 1;
        acted_or_not = 0;
        action_or_not = 2.5;
        comp_select_time = 0;
        num_actions = 1;
        retry_loop = 2;
        comp_extra_five = 0;
        continueRoutine = false;
        sreview_ins.finished = true;
    }
    if (((trials_task.thisN === total_num_forced) || (trials_task.thisN === (total_num_forced + 1)))) {
        only_first_trial = 1000;
    } else {
        only_first_trial = 0;
    }
    if ((forced_actions === true)) {
        continueRoutine = false;
        allowed_on_opt = ["y"];
        opt_in_text_shown = "Activate Free Ticket for 3 attempts(Press 'Y')";
    } else {
        allowed_on_opt = ["9", "1", "2", "3"];
        opt_in_text_shown = "How much do you want to invest in boarding a ride?\n\n0- 0 tickets (walk)\n1 ticket (Cost: 40 coins)\n2 tickets (Cost:60 coins, 1 jump)\n3 tickets (Cost: 80 coins, 2 jumps)";
    }
    
    background_color_4.setFillColor(new util.Color(color_back));
    dep_island_5.setImage(beg_island);
    comp_choose.setText(opt_in_text_shown);
    cur_winnings_3.setText((("\n\n\n" + "Current total earnings: ") + total_earned.toString()));
    planet_number_5.setText(((((((("Planet " + (block.thisN + 1).toString()) + " of ") + num_blocks.toString()) + "\nTrip ") + (trials_task.thisN + 1).toString()) + " of ") + trial_length.toString()));
    startOptTime = new Date();
    start_opt_time= Math.floor(startOptTime.getTime() / 1000);
    psychoJS.experiment.addData("optIn_started", start_opt_time);
    opt_timedOut=false;
    first_opt = Math.floor(startOptTime.getTime() / 1000);
    
    opt_in.keys = undefined;
    opt_in.rt = undefined;
    _opt_in_allKeys = [];
    // keep track of which components have finished
    opt_in_choice_3Components = [];
    opt_in_choice_3Components.push(background_color_4);
    opt_in_choice_3Components.push(dep_island_5);
    opt_in_choice_3Components.push(comp_choose);
    opt_in_choice_3Components.push(here);
    opt_in_choice_3Components.push(origin_pointer);
    opt_in_choice_3Components.push(cur_winnings_3);
    opt_in_choice_3Components.push(planet_number_5);
    opt_in_choice_3Components.push(occluded_treasure_2);
    opt_in_choice_3Components.push(text_30);
    opt_in_choice_3Components.push(opt_in);
    opt_in_choice_3Components.push(image_2);
    
    opt_in_choice_3Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


var time_sopt;
var currentOpt_time;
var timeOfOpttimeOut;
function opt_in_choice_3RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'opt_in_choice_3'-------
    // get current time
    t = opt_in_choice_3Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *background_color_4* updates
    if (t >= 0.0 && background_color_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background_color_4.tStart = t;  // (not accounting for frame time here)
      background_color_4.frameNStart = frameN;  // exact frame index
      
      background_color_4.setAutoDraw(true);
    }

    
    // *dep_island_5* updates
    if (t >= 0.0 && dep_island_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dep_island_5.tStart = t;  // (not accounting for frame time here)
      dep_island_5.frameNStart = frameN;  // exact frame index
      
      dep_island_5.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (dep_island_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      dep_island_5.setAutoDraw(false);
    }
    
    // *comp_choose* updates
    if (t >= 0.0 && comp_choose.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      comp_choose.tStart = t;  // (not accounting for frame time here)
      comp_choose.frameNStart = frameN;  // exact frame index
      
      comp_choose.setAutoDraw(true);
    }

    
    // *here* updates
    if (t >= 0.0 && here.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      here.tStart = t;  // (not accounting for frame time here)
      here.frameNStart = frameN;  // exact frame index
      
      here.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (here.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      here.setAutoDraw(false);
    }
    
    // *origin_pointer* updates
    if (t >= 0.0 && origin_pointer.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      origin_pointer.tStart = t;  // (not accounting for frame time here)
      origin_pointer.frameNStart = frameN;  // exact frame index
      
      origin_pointer.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (origin_pointer.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      origin_pointer.setAutoDraw(false);
    }
    
    // *cur_winnings_3* updates
    if (t >= 0.0 && cur_winnings_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      cur_winnings_3.tStart = t;  // (not accounting for frame time here)
      cur_winnings_3.frameNStart = frameN;  // exact frame index
      
      cur_winnings_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (cur_winnings_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      cur_winnings_3.setAutoDraw(false);
    }
    
    // *planet_number_5* updates
    if (t >= 0.0 && planet_number_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      planet_number_5.tStart = t;  // (not accounting for frame time here)
      planet_number_5.frameNStart = frameN;  // exact frame index
      
      planet_number_5.setAutoDraw(true);
    }

    time_sopt = new Date();
    currentOpt_time= Math.floor(time_sopt.getTime() / 1000);
    
    
    if (((currentOpt_time - first_opt) > 25)) {
        timeOfOpttimeOut = Math.floor(time_sopt.getTime() / 1000);
    
        psychoJS.experiment.addData("opt_timeout_time", timeOfOpttimeOut);
        psychoJS.experiment.addData("opt_timeout", 1);
    
        opt_timedOut=true;
    
        continueRoutine = false;
        total_opt_timedOut+=1;
    
    }
    
    
    
    
    // *occluded_treasure_2* updates
    if (t >= 0.0 && occluded_treasure_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      occluded_treasure_2.tStart = t;  // (not accounting for frame time here)
      occluded_treasure_2.frameNStart = frameN;  // exact frame index
      
      occluded_treasure_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (occluded_treasure_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      occluded_treasure_2.setAutoDraw(false);
    }
    
    // *text_30* updates
    if (t >= 0.0 && text_30.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_30.tStart = t;  // (not accounting for frame time here)
      text_30.frameNStart = frameN;  // exact frame index
      
      text_30.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_30.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_30.setAutoDraw(false);
    }
    
    // *opt_in* updates
    if (t >= 0.0 && opt_in.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      opt_in.tStart = t;  // (not accounting for frame time here)
      opt_in.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { opt_in.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { opt_in.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { opt_in.clearEvents(); });
    }

    if (opt_in.status === PsychoJS.Status.STARTED) {
      let theseKeys = opt_in.getKeys({keyList: ['1', '2', '3', '9'], waitRelease: false});
      _opt_in_allKeys = _opt_in_allKeys.concat(theseKeys);
      if (_opt_in_allKeys.length > 0) {
        opt_in.keys = _opt_in_allKeys[_opt_in_allKeys.length - 1].name;  // just the last key pressed
        opt_in.rt = _opt_in_allKeys[_opt_in_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *image_2* updates
    if (t >= 0.0 && image_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      image_2.tStart = t;  // (not accounting for frame time here)
      image_2.frameNStart = frameN;  // exact frame index
      
      image_2.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    opt_in_choice_3Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var proscribed_actions;
var end_opt;
var end_opt_time;
function opt_in_choice_3RoutineEnd() {
  return async function () {
    //------Ending Routine 'opt_in_choice_3'-------
    opt_in_choice_3Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData("block", block.thisN);
    psychoJS.experiment.addData("trials", trials_task.thisN);
    psychoJS.experiment.addData("left_option", left_plane);
    psychoJS.experiment.addData("right_option", right_plane);
    psychoJS.experiment.addData("treasure_island", end_island);
    psychoJS.experiment.addData("starting_island", beg_island);
    psychoJS.experiment.addData("single_ticket", single_ticket_success[trials_task.thisN]);
    psychoJS.experiment.addData("second_ticket", two_ticket_success[trials_task.thisN]);
    psychoJS.experiment.addData("third_ticket", three_ticket_success[trials_task.thisN]);
    console.log(("id number to use is " + part_id.toString()));
    
    if ((forced_actions === false)) {
        if ((((opt_in.keys === "1") || (opt_in.keys === "2")) || (opt_in.keys === "3"))) {
            cs = 1;
            acted_or_not = 0;
            action_or_not = 2.5;
            comp_select_time = 0;
            (num_actions === 0);
            retry_loop = 2;
            comp_extra_five = 0;
            sreview_ins.finished = true;
        } else {
            if ((opt_in.keys === "9")) {
                cs = 0;
                acted_or_not = 2;
                action_or_not = 0;
                comp_select_time = 3;
                (num_actions === 0);
                retry_loop = 0;
                comp_extra_five = 1;
                sreview_ins.finished = true;
            }
        }
    }
    if ((block.thisN > 5)) {
        la_opt_in.push(cs);
        feat_lr.push([(c_inelastic + (c_elastic / 2))]);
    }
    if ((opt_in.keys === "1")) {
        proscribed_actions = 1;
    } else {
        if ((opt_in.keys === "2")) {
            proscribed_actions = 2;
        } else {
            if ((opt_in.keys === "3")) {
                proscribed_actions = 3;
            } else {
                if ((opt_in.keys === "9")) {
                    proscribed_actions = 0;
                } else {
                    proscribed_actions = 444;
                }
            }
        }
    }
    
    
    end_opt = new Date();
    end_opt_time= Math.floor(end_opt.getTime() / 1000);
    psychoJS.experiment.addData("opt_end_time", end_opt_time);
    
    
    
    if ((total_opt_timedOut>8)){
        psychoJS.quit({message: 'You have timed out too many times and therefore cannot proceed with the study'});
    
        
        
    }
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(opt_in.corr, level);
    }
    psychoJS.experiment.addData('opt_in.keys', opt_in.keys);
    if (typeof opt_in.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('opt_in.rt', opt_in.rt);
        routineTimer.reset();
        }
    
    opt_in.stop();
    // the Routine "opt_in_choice_3" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var timedOut_LostComponents;
function timedOut_LostRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'timedOut_Lost'-------
    t = 0;
    timedOut_LostClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(2.000000);
    // update component parameters for each repeat
    if ((opt_timedOut === false)) {
        if (((((opt_in.keys === "0") || (opt_in.keys === "1")) || (opt_in.keys === "2")) || (opt_in.keys === "3"))) {
            sreview_ins.finished = true;
            continueRoutine = false;
        } else {
            if ((opt_timedOut === true)) {
                continueRoutine = false;
            } else {
                continueRoutine = false;
            }
        }
    } else {
        if ((opt_timedOut === true)) {
            total_earned -= 100;
        }
    }
    
    polygon_16.setFillColor(new util.Color(color_back));
    text_29.setText(("TIMED OUT!!\n\nBandits got to you and stole 100 coins.\n\nNew current earnings: " + total_earned.toString()));
    // keep track of which components have finished
    timedOut_LostComponents = [];
    timedOut_LostComponents.push(polygon_16);
    timedOut_LostComponents.push(text_29);
    
    timedOut_LostComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function timedOut_LostRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'timedOut_Lost'-------
    // get current time
    t = timedOut_LostClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *polygon_16* updates
    if (t >= 0.0 && polygon_16.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon_16.tStart = t;  // (not accounting for frame time here)
      polygon_16.frameNStart = frameN;  // exact frame index
      
      polygon_16.setAutoDraw(true);
    }

    frameRemains = 0.0 + 2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (polygon_16.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      polygon_16.setAutoDraw(false);
    }
    
    // *text_29* updates
    if (t >= 0.0 && text_29.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_29.tStart = t;  // (not accounting for frame time here)
      text_29.frameNStart = frameN;  // exact frame index
      
      text_29.setAutoDraw(true);
    }

    frameRemains = 0.0 + 2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_29.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_29.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    timedOut_LostComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function timedOut_LostRoutineEnd() {
  return async function () {
    //------Ending Routine 'timedOut_Lost'-------
    timedOut_LostComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    return Scheduler.Event.NEXT;
  };
}


var feedback_action;
var timedOut;
var show_total_earned;
var forced;
var gors;
var _key_resp_2_allKeys;
var startchoiceTime;
var choice_timedOut;
var start_choice;
var total_choice_timedOut;
var timeAllowed;
var make_choiceComponents;
function make_choiceRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'make_choice'-------
    t = 0;
    make_choiceClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    polygon_5.setFillColor(new util.Color(color_back));
    num_actions = 1;
    feedback_action = [];
    timedOut = false;
    if ((cs === 0)) {
        continueRoutine = false;
    } else {
        continueRoutine = true;
    }
    cur_winnings.alignHoriz = "left";
    feedback_action = [];
    timedOut = false;
    if (((cs === 1) && (forced_actions === false))) {
        show_total_earned = (total_earned - 40);
    } else {
        show_total_earned = total_earned;
    }
    if ((forced_actions === true)) {
        proscribed_actions = 3;
        forced = 10;
        gors = 0;
    } else {
        forced = 0;
        if ((block.thisN < 6)) {
            gors = 0;
        } else {
            gors = 10;
        }
    }
    
    dep_island.setImage(beg_island);
    left_choice.setImage(left_plane);
    right_choice.setImage(right_plane);
    destination_island.setImage(end_island);
    key_resp_2.keys = undefined;
    key_resp_2.rt = undefined;
    _key_resp_2_allKeys = [];
    cur_winnings.setText((((("\n" + "Total Earnings Before Ticket: ") + (show_total_earned + 40).toString()) + "\nTotal Earnings After Ticket: ") + show_total_earned.toString()));
    startchoiceTime = new Date();
    psychoJS.experiment.addData("choice_started", startchoiceTime);
    choice_timedOut=false;
    start_choice = Math.floor(startchoiceTime.getTime() / 1000);
    total_choice_timedOut=0;
    
    if ((forced_actions === true)){
        timeAllowed=15;
    } else {
        timeAllowed=15;
      
    }
    planet_number_4.setText(((((((("Planet " + (block.thisN + 1).toString()) + " of ") + num_blocks.toString()) + "\nTrip ") + (trials_task.thisN + 1).toString()) + " of ") + trial_length.toString()));
    image.setColor(new util.Color(color_back));
    text_14.setText('Free ticket! ');
    // keep track of which components have finished
    make_choiceComponents = [];
    make_choiceComponents.push(polygon_5);
    make_choiceComponents.push(press1_2);
    make_choiceComponents.push(dep_island);
    make_choiceComponents.push(left_choice);
    make_choiceComponents.push(right_choice);
    make_choiceComponents.push(destination_island);
    make_choiceComponents.push(key_resp_2);
    make_choiceComponents.push(cur_winnings);
    make_choiceComponents.push(press9);
    make_choiceComponents.push(planet_number_4);
    make_choiceComponents.push(image);
    make_choiceComponents.push(text_14);
    
    make_choiceComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


var time_choice;
var currentChoice_time;
var timeOfChoicetimeOut;
function make_choiceRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'make_choice'-------
    // get current time
    t = make_choiceClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *polygon_5* updates
    if (t >= 0.0 && polygon_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon_5.tStart = t;  // (not accounting for frame time here)
      polygon_5.frameNStart = frameN;  // exact frame index
      
      polygon_5.setAutoDraw(true);
    }

    
    // *press1_2* updates
    if (t >= 0.0 && press1_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      press1_2.tStart = t;  // (not accounting for frame time here)
      press1_2.frameNStart = frameN;  // exact frame index
      
      press1_2.setAutoDraw(true);
    }

    
    // *dep_island* updates
    if (t >= 0.0 && dep_island.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dep_island.tStart = t;  // (not accounting for frame time here)
      dep_island.frameNStart = frameN;  // exact frame index
      
      dep_island.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (dep_island.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      dep_island.setAutoDraw(false);
    }
    
    // *left_choice* updates
    if (t >= 0.0 && left_choice.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      left_choice.tStart = t;  // (not accounting for frame time here)
      left_choice.frameNStart = frameN;  // exact frame index
      
      left_choice.setAutoDraw(true);
    }

    
    // *right_choice* updates
    if (t >= 0.0 && right_choice.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      right_choice.tStart = t;  // (not accounting for frame time here)
      right_choice.frameNStart = frameN;  // exact frame index
      
      right_choice.setAutoDraw(true);
    }

    
    // *destination_island* updates
    if (t >= 0.0 && destination_island.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      destination_island.tStart = t;  // (not accounting for frame time here)
      destination_island.frameNStart = frameN;  // exact frame index
      
      destination_island.setAutoDraw(true);
    }

    
    // *key_resp_2* updates
    if (t >= 0.0 && key_resp_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_2.tStart = t;  // (not accounting for frame time here)
      key_resp_2.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_2.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_2.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_2.clearEvents(); });
    }

    if (key_resp_2.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_2.getKeys({keyList: [1, '1', '9', 9], waitRelease: false});
      _key_resp_2_allKeys = _key_resp_2_allKeys.concat(theseKeys);
      if (_key_resp_2_allKeys.length > 0) {
        key_resp_2.keys = _key_resp_2_allKeys[_key_resp_2_allKeys.length - 1].name;  // just the last key pressed
        key_resp_2.rt = _key_resp_2_allKeys[_key_resp_2_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *cur_winnings* updates
    if (t >= 0.0 && cur_winnings.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      cur_winnings.tStart = t;  // (not accounting for frame time here)
      cur_winnings.frameNStart = frameN;  // exact frame index
      
      cur_winnings.setAutoDraw(true);
    }

    frameRemains = 0.0 + gors - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (cur_winnings.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      cur_winnings.setAutoDraw(false);
    }
    time_choice = new Date();
    currentChoice_time= Math.floor(time_choice.getTime() / 1000);
    
    
    
    if (((currentChoice_time - start_choice) > timeAllowed)) {
        timeOfChoicetimeOut = currentChoice_time;
    
        psychoJS.experiment.addData("choice_timeout_time", timeOfChoicetimeOut);
        psychoJS.experiment.addData("choice_timeout", 1);
        cs=0;
        retry_loop=0;
        total_choice_timedOut+=1;
    
        choice_timedOut=true;
    
        continueRoutine = false;
    
    }
    
    
    
    
    // *press9* updates
    if (t >= 0.0 && press9.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      press9.tStart = t;  // (not accounting for frame time here)
      press9.frameNStart = frameN;  // exact frame index
      
      press9.setAutoDraw(true);
    }

    
    // *planet_number_4* updates
    if (t >= 0.0 && planet_number_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      planet_number_4.tStart = t;  // (not accounting for frame time here)
      planet_number_4.frameNStart = frameN;  // exact frame index
      
      planet_number_4.setAutoDraw(true);
    }

    
    // *image* updates
    if (t >= 0.0 && image.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      image.tStart = t;  // (not accounting for frame time here)
      image.frameNStart = frameN;  // exact frame index
      
      image.setAutoDraw(true);
    }

    frameRemains = 0.0 + 12 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (image.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      image.setAutoDraw(false);
    }
    
    // *text_14* updates
    if (t >= 0.0 && text_14.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_14.tStart = t;  // (not accounting for frame time here)
      text_14.frameNStart = frameN;  // exact frame index
      
      text_14.setAutoDraw(true);
    }

    frameRemains = 0.0 + forced - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_14.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_14.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    make_choiceComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var end_choice;
var end_choice_time;
function make_choiceRoutineEnd() {
  return async function () {
    //------Ending Routine 'make_choice'-------
    make_choiceComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    console.log(("forced actions post choice" + forced_actions.toString()));
    
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(key_resp_2.corr, level);
    }
    psychoJS.experiment.addData('key_resp_2.keys', key_resp_2.keys);
    if (typeof key_resp_2.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_2.rt', key_resp_2.rt);
        routineTimer.reset();
        }
    
    key_resp_2.stop();
    
    end_choice = new Date();
    end_choice_time= Math.floor(end_choice.getTime() / 1000);
    psychoJS.experiment.addData("end_choice_time", end_choice_time);
    
    
    
    if ((total_choice_timedOut>7)){
        psychoJS.quit({message: 'You have timed out too many times and therefore cannot proceed with the study'});
    
        
        
    }
    // the Routine "make_choice" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var comp;
var after_total_actions;
var success_act;
var _key_resp_6_allKeys;
var show_choiceComponents;
function show_choiceRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'show_choice'-------
    t = 0;
    show_choiceClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    polygon_6.setFillColor(new util.Color(color_back));
    continueRoutine = false;
    if (((cs === 0) || (choice_timedOut === true))) {
        continueRoutine = false;
    } else {
        if ((trials_task.thisN < (num_1_actions + num_3_actions))) {
            continueRoutine = false;
        } else {
            if ((forced_actions === true)) {
                continueRoutine = false;
            }
        }
    }
    if ((cs === 1)) {
        comp = 0;
        num_actions = 1;
        start_time = 0;
        if ((key_resp_2.keys === "1")) {
            plane_selected = left_plane;
            var_time_left = 10;
            var_time_right = 0;
        } else {
            if ((key_resp_2.keys === "9")) {
                plane_selected = right_plane;
                var_time_left = 0;
                var_time_right = 10;
            }
        }
    }
    console.log("no issues 3");
    if ((trials_task.thisN >= total_num_forced)) {
        after_total_actions = 10;
    } else {
        after_total_actions = 0;
    }
    
    dep_island_3.setImage(beg_island);
    right_choice_3.setImage(right_plane);
    destination_island_3.setImage(end_island);
    left_choice_3.setImage(left_plane);
    planet_number_2.setText(((((((("Planet " + (block.thisN + 1).toString()) + " of ") + num_blocks.toString()) + "\nTrip ") + (trials_task.thisN + 1).toString()) + " of ") + trial_length.toString()));
    console.log("no issues 4");
    psychoJS.experiment.addData("method_selected", plane_selected);
    if (((cs === 1) && (action_transitions[plane_selected] === end_island))) {
        psychoJS.experiment.addData("correct_chosen", 1);
    } else {
        if ((cs === 0)) {
            psychoJS.experiment.addData("correct_chosen", "");
        } else {
            psychoJS.experiment.addData("correct_chosen", 0);
        }
    }
    success_act = [];
    timedOut = false;
    buy_Second_ticket.alignHoriz = "left";
    
    key_resp_6.keys = undefined;
    key_resp_6.rt = undefined;
    _key_resp_6_allKeys = [];
    // keep track of which components have finished
    show_choiceComponents = [];
    show_choiceComponents.push(polygon_6);
    show_choiceComponents.push(dep_island_3);
    show_choiceComponents.push(right_choice_3);
    show_choiceComponents.push(destination_island_3);
    show_choiceComponents.push(left_choice_3);
    show_choiceComponents.push(treasure);
    show_choiceComponents.push(planet_number_2);
    show_choiceComponents.push(key_resp_6);
    show_choiceComponents.push(buy_Second_ticket);
    show_choiceComponents.push(action_distinction);
    
    show_choiceComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function show_choiceRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'show_choice'-------
    // get current time
    t = show_choiceClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *polygon_6* updates
    if (t >= 0.0 && polygon_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon_6.tStart = t;  // (not accounting for frame time here)
      polygon_6.frameNStart = frameN;  // exact frame index
      
      polygon_6.setAutoDraw(true);
    }

    frameRemains = 0.0 + 10 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (polygon_6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      polygon_6.setAutoDraw(false);
    }
    
    // *dep_island_3* updates
    if (t >= 0.0 && dep_island_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      dep_island_3.tStart = t;  // (not accounting for frame time here)
      dep_island_3.frameNStart = frameN;  // exact frame index
      
      dep_island_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (dep_island_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      dep_island_3.setAutoDraw(false);
    }
    
    // *right_choice_3* updates
    if (t >= start_time && right_choice_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      right_choice_3.tStart = t;  // (not accounting for frame time here)
      right_choice_3.frameNStart = frameN;  // exact frame index
      
      right_choice_3.setAutoDraw(true);
    }

    frameRemains = start_time + var_time_right - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (right_choice_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      right_choice_3.setAutoDraw(false);
    }
    
    // *destination_island_3* updates
    if (t >= 0.0 && destination_island_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      destination_island_3.tStart = t;  // (not accounting for frame time here)
      destination_island_3.frameNStart = frameN;  // exact frame index
      
      destination_island_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (destination_island_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      destination_island_3.setAutoDraw(false);
    }
    
    // *left_choice_3* updates
    if (t >= start_time && left_choice_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      left_choice_3.tStart = t;  // (not accounting for frame time here)
      left_choice_3.frameNStart = frameN;  // exact frame index
      
      left_choice_3.setAutoDraw(true);
    }

    frameRemains = start_time + var_time_left - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (left_choice_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      left_choice_3.setAutoDraw(false);
    }
    
    // *treasure* updates
    if (t >= 0.0 && treasure.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      treasure.tStart = t;  // (not accounting for frame time here)
      treasure.frameNStart = frameN;  // exact frame index
      
      treasure.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (treasure.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      treasure.setAutoDraw(false);
    }
    
    // *planet_number_2* updates
    if (t >= 0.0 && planet_number_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      planet_number_2.tStart = t;  // (not accounting for frame time here)
      planet_number_2.frameNStart = frameN;  // exact frame index
      
      planet_number_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 10 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (planet_number_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      planet_number_2.setAutoDraw(false);
    }
    
    // *key_resp_6* updates
    if (t >= 0.0 && key_resp_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_6.tStart = t;  // (not accounting for frame time here)
      key_resp_6.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_6.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_6.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_6.clearEvents(); });
    }

    frameRemains = 0.0 + 10 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (key_resp_6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      key_resp_6.status = PsychoJS.Status.FINISHED;
  }

    if (key_resp_6.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_6.getKeys({keyList: ['y', 'n'], waitRelease: false});
      _key_resp_6_allKeys = _key_resp_6_allKeys.concat(theseKeys);
      if (_key_resp_6_allKeys.length > 0) {
        key_resp_6.keys = _key_resp_6_allKeys[_key_resp_6_allKeys.length - 1].name;  // just the last key pressed
        key_resp_6.rt = _key_resp_6_allKeys[_key_resp_6_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *buy_Second_ticket* updates
    if (t >= 0.0 && buy_Second_ticket.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      buy_Second_ticket.tStart = t;  // (not accounting for frame time here)
      buy_Second_ticket.frameNStart = frameN;  // exact frame index
      
      buy_Second_ticket.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (buy_Second_ticket.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      buy_Second_ticket.setAutoDraw(false);
    }
    
    // *action_distinction* updates
    if (t >= 0.0 && action_distinction.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      action_distinction.tStart = t;  // (not accounting for frame time here)
      action_distinction.frameNStart = frameN;  // exact frame index
      
      action_distinction.setAutoDraw(true);
    }

    frameRemains = 0.0 + 10 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (action_distinction.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      action_distinction.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    show_choiceComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function show_choiceRoutineEnd() {
  return async function () {
    //------Ending Routine 'show_choice'-------
    show_choiceComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    if ((key_resp_6.keys === "n")) {
        retry_loop = 0;
        num_actions = 1;
    }
    console.log("no issues 5");
    
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(key_resp_6.corr, level);
    }
    psychoJS.experiment.addData('key_resp_6.keys', key_resp_6.keys);
    if (typeof key_resp_6.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_6.rt', key_resp_6.rt);
        routineTimer.reset();
        }
    
    key_resp_6.stop();
    // the Routine "show_choice" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var if_opts;
var tpla;
var s_text;
var sp;
var textss;
var dep;
var time_for_this;
var pos_c;
var ok_wait_2Components;
function ok_wait_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'ok_wait_2'-------
    t = 0;
    ok_wait_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    if ((proscribed_actions > 1)) {
        continueRoutine = false;
    }
    if ((cs === 0)) {
        if_opts = 5;
        tpla = 0;
        s_text = 5;
        sp = 5;
        textss = Math.round((5 - t), 1);
        dep = "You have chosen to walk...";
        time_for_this = 5;
    } else {
        if ((cs === 1)) {
            if_opts = 0;
            if ((block.thisN < 3)) {
                tpla = 3;
            } else {
                tpla = 0;
            }
            s_text = 3;
            sp = 3;
            textss = Math.round((4 - t), 1);
            dep = "Waiting for your ride...";
            time_for_this = 3;
        }
    }
    console.log(("time should be " + sp.toString()));
    if ((left_plane === plane_selected)) {
        pos_c = [(- 0.25), 0.25];
    } else {
        if ((right_plane === plane_selected)) {
            pos_c = [0.25, 0.25];
        } else {
            pos_c = [0, 0.15];
        }
    }
    
    if ((t > 6)) {
        continueRoutine = false;
    }
    
    polygon_3.setFillColor(new util.Color(color_back));
    if ((proscribed_actions === 1)) {
        retry_loop = 0;
    }
    
    Computer_Selects_3.setText(dep);
    departure_state_5.setImage(beg_island);
    planet_number_3.setText(((((((("Planet " + (block.thisN + 1).toString()) + " of ") + num_blocks.toString()) + "\nTrip ") + (trials_task.thisN + 1).toString()) + " of ") + trial_length.toString()));
    tran_selected_2.setPos(pos_c);
    tran_selected_2.setImage(plane_selected);
    // keep track of which components have finished
    ok_wait_2Components = [];
    ok_wait_2Components.push(polygon_3);
    ok_wait_2Components.push(Computer_Selects_3);
    ok_wait_2Components.push(departure_state_5);
    ok_wait_2Components.push(planet_number_3);
    ok_wait_2Components.push(eight);
    ok_wait_2Components.push(tran_selected_2);
    ok_wait_2Components.push(walk);
    
    ok_wait_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function ok_wait_2RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'ok_wait_2'-------
    // get current time
    t = ok_wait_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    if ((cs === 1)) {
        sp = 3;
        if ((t > 2.9)) {
            continueRoutine = false;
        }
    } else {
        if ((cs === 0)) {
            sp = 5;
            if ((t > 5.1)) {
                continueRoutine = false;
            }
        }
    }
    
    
    // *polygon_3* updates
    if (t >= 0.0 && polygon_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon_3.tStart = t;  // (not accounting for frame time here)
      polygon_3.frameNStart = frameN;  // exact frame index
      
      polygon_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + sp - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (polygon_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      polygon_3.setAutoDraw(false);
    }
    
    // *Computer_Selects_3* updates
    if (t >= 0 && Computer_Selects_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Computer_Selects_3.tStart = t;  // (not accounting for frame time here)
      Computer_Selects_3.frameNStart = frameN;  // exact frame index
      
      Computer_Selects_3.setAutoDraw(true);
    }

    frameRemains = 0 + time_for_this - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (Computer_Selects_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Computer_Selects_3.setAutoDraw(false);
    }
    
    // *departure_state_5* updates
    if (t >= 0 && departure_state_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      departure_state_5.tStart = t;  // (not accounting for frame time here)
      departure_state_5.frameNStart = frameN;  // exact frame index
      
      departure_state_5.setAutoDraw(true);
    }

    frameRemains = 0 + time_for_this - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (departure_state_5.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      departure_state_5.setAutoDraw(false);
    }
    
    // *planet_number_3* updates
    if (t >= 0.0 && planet_number_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      planet_number_3.tStart = t;  // (not accounting for frame time here)
      planet_number_3.frameNStart = frameN;  // exact frame index
      
      planet_number_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + s_text - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (planet_number_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      planet_number_3.setAutoDraw(false);
    }
    
    // *eight* updates
    if (t >= 0.0 && eight.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      eight.tStart = t;  // (not accounting for frame time here)
      eight.frameNStart = frameN;  // exact frame index
      
      eight.setAutoDraw(true);
    }

    frameRemains = 0.0 + sp - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (eight.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      eight.setAutoDraw(false);
    }
    
    if (eight.status === PsychoJS.Status.STARTED){ // only update if being drawn
      eight.setText(("Time until departure: " + Math.round((sp - t), 1)), false);
    }
    
    // *tran_selected_2* updates
    if (t >= 1 && tran_selected_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      tran_selected_2.tStart = t;  // (not accounting for frame time here)
      tran_selected_2.frameNStart = frameN;  // exact frame index
      
      tran_selected_2.setAutoDraw(true);
    }

    frameRemains = 1 + 0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (tran_selected_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      tran_selected_2.setAutoDraw(false);
    }
    
    // *walk* updates
    if (t >= 0.0 && walk.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      walk.tStart = t;  // (not accounting for frame time here)
      walk.frameNStart = frameN;  // exact frame index
      
      walk.setAutoDraw(true);
    }

    frameRemains = 0.0 + if_opts - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (walk.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      walk.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    ok_wait_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function ok_wait_2RoutineEnd() {
  return async function () {
    //------Ending Routine 'ok_wait_2'-------
    ok_wait_2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "ok_wait_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var depends_which_attempt;
var slide_n;
var startTime;
var time_now;
var action_started;
var _ready_2_allKeys;
var action_prep_2Components;
function action_prep_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'action_prep_2'-------
    t = 0;
    action_prep_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    warning_2.alignHoriz = "left";
    if ((retry.thisN === 0)) {
        depends_which_attempt = 10;
        slide_n = 1;
    } else {
        depends_which_attempt = 10;
        slide_n = 2;
    }
    
    
    
    if ((retry.thisN===0)) {
        startTime = new Date();
    }
    if ((retry.thisN === 0)) {
         time_now = new Date();
         action_started = Math.floor(time_now.getTime() / 1000);
         psychoJS.experiment.addData("action_started", action_started);
    
        
    }
    
    polygon_7.setFillColor(new util.Color(color_back));
    ready_2.keys = undefined;
    ready_2.rt = undefined;
    _ready_2_allKeys = [];
    if ((plane_selected === plane)) {
        selected_object = "plane";
    } else {
        if ((plane_selected === train)) {
            selected_object = "train";
        }
    }
    
    new_platform.setImage((("distinguiish_actions/Slide" + slide_n.toString()) + ".jpeg"));
    // keep track of which components have finished
    action_prep_2Components = [];
    action_prep_2Components.push(polygon_7);
    action_prep_2Components.push(warning_2);
    action_prep_2Components.push(ready_2);
    action_prep_2Components.push(new_platform);
    
    action_prep_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


var leftTime;
var timeelapsed;
var time_s;
var action_c;
var action_cr;
function action_prep_2RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'action_prep_2'-------
    // get current time
    t = action_prep_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    leftTime = new Date();
    timeelapsed = (startTime - leftTime)/1000
    text_9 = Math.round(11+timeelapsed)
    time_s = new Date();
    action_c = Math.floor(time_s.getTime() / 1000);
    
    
    // *polygon_7* updates
    if (t >= 0.0 && polygon_7.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon_7.tStart = t;  // (not accounting for frame time here)
      polygon_7.frameNStart = frameN;  // exact frame index
      
      polygon_7.setAutoDraw(true);
    }

    
    // *warning_2* updates
    if (t >= 0.0 && warning_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      warning_2.tStart = t;  // (not accounting for frame time here)
      warning_2.frameNStart = frameN;  // exact frame index
      
      warning_2.setAutoDraw(true);
    }

    
    // *ready_2* updates
    if (t >= 0.0 && ready_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ready_2.tStart = t;  // (not accounting for frame time here)
      ready_2.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { ready_2.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { ready_2.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { ready_2.clearEvents(); });
    }

    if (ready_2.status === PsychoJS.Status.STARTED) {
      let theseKeys = ready_2.getKeys({keyList: ['space'], waitRelease: false});
      _ready_2_allKeys = _ready_2_allKeys.concat(theseKeys);
      if (_ready_2_allKeys.length > 0) {
        ready_2.keys = _ready_2_allKeys[_ready_2_allKeys.length - 1].name;  // just the last key pressed
        ready_2.rt = _ready_2_allKeys[_ready_2_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    if (((action_c - action_started) > 13)) {
        action_cr = Math.floor(time_s.getTime() / 1000);
    
        psychoJS.experiment.addData("action_ended", action_cr);
        timedOut=true;
        
        retry.finished = true;
    
        continueRoutine = false;
    
    }
    
    
    // *new_platform* updates
    if (t >= 0.0 && new_platform.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      new_platform.tStart = t;  // (not accounting for frame time here)
      new_platform.frameNStart = frameN;  // exact frame index
      
      new_platform.setAutoDraw(true);
    }

    frameRemains = 0.0 + 10 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (new_platform.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      new_platform.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    action_prep_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function action_prep_2RoutineEnd() {
  return async function () {
    //------Ending Routine 'action_prep_2'-------
    action_prep_2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(ready_2.corr, level);
    }
    psychoJS.experiment.addData('ready_2.keys', ready_2.keys);
    if (typeof ready_2.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('ready_2.rt', ready_2.rt);
        routineTimer.reset();
        }
    
    ready_2.stop();
    // the Routine "action_prep_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var cuePulse;
var _action_2_allKeys;
var action_execComponents;
function action_execRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'action_exec'-------
    t = 0;
    action_execClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    polygon_9.setFillColor(new util.Color(color_back));
    
    
    if ((timedOut === true)) {
        continueRoutine = false;
    }
    
    yScale = 0.45;
    minSize = 0.1;
    maxSize = 0.1;
    cuePulse = 3;
    pathStart = [(- 1), (- 0.9)];
    pathN = 0;
    xScale = ((psychoJS.window.size[0] / psychoJS.window.size[1]) * 0.45);
    posClock = new util.Clock();
    sizeClock = new util.Clock();
    cueSize = minSize;
    cuePos = pathStart;
    posClock.reset();
    sizeClock.reset();
    
    action_2.keys = undefined;
    action_2.rt = undefined;
    _action_2_allKeys = [];
    moving_cue_7.setImage(plane_selected);
    // keep track of which components have finished
    action_execComponents = [];
    action_execComponents.push(polygon_9);
    action_execComponents.push(action_2);
    action_execComponents.push(cue_object_2);
    action_execComponents.push(moving_cue_7);
    action_execComponents.push(timer_text);
    
    action_execComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function action_execRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'action_exec'-------
    // get current time
    t = action_execClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *polygon_9* updates
    if (t >= 0.0 && polygon_9.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon_9.tStart = t;  // (not accounting for frame time here)
      polygon_9.frameNStart = frameN;  // exact frame index
      
      polygon_9.setAutoDraw(true);
    }

    leftTime = new Date();
    timeelapsed = (startTime - leftTime)/1000
    text_9 = Math.round(8+timeelapsed)
    if ((action_2.keys === "space")) {
        current_pos = cuePos;
        
    }
    pathTime = 1;
    pathEnd = [1, (- 0.95)];
    cuePos = [(xScale * (pathStart[0] + (((Number.parseFloat(pathEnd[0]) - pathStart[0]) * posClock.getTime()) / Number.parseFloat(pathTime)))), (yScale * (pathStart[1] + (((Number.parseFloat(pathEnd[1]) - pathStart[1]) * posClock.getTime()) / Number.parseFloat(pathEnd[1]))))];
    
    
    // *action_2* updates
    if (t >= 0.2 && action_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      action_2.tStart = t;  // (not accounting for frame time here)
      action_2.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { action_2.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { action_2.start(); }); // start on screen flip
    }

    if (action_2.status === PsychoJS.Status.STARTED) {
      let theseKeys = action_2.getKeys({keyList: ['space'], waitRelease: false});
      _action_2_allKeys = _action_2_allKeys.concat(theseKeys);
      if (_action_2_allKeys.length > 0) {
        action_2.keys = _action_2_allKeys[_action_2_allKeys.length - 1].name;  // just the last key pressed
        action_2.rt = _action_2_allKeys[_action_2_allKeys.length - 1].rt;
      }
    }
    
    
    // *cue_object_2* updates
    if (t >= 0.0 && cue_object_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      cue_object_2.tStart = t;  // (not accounting for frame time here)
      cue_object_2.frameNStart = frameN;  // exact frame index
      
      cue_object_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (cue_object_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      cue_object_2.setAutoDraw(false);
    }
    
    // *moving_cue_7* updates
    if (t >= 0.0 && moving_cue_7.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      moving_cue_7.tStart = t;  // (not accounting for frame time here)
      moving_cue_7.frameNStart = frameN;  // exact frame index
      
      moving_cue_7.setAutoDraw(true);
    }

    
    if (moving_cue_7.status === PsychoJS.Status.STARTED){ // only update if being drawn
      moving_cue_7.setPos(cuePos, false);
    }
    
    // *timer_text* updates
    if (t >= 0.0 && timer_text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      timer_text.tStart = t;  // (not accounting for frame time here)
      timer_text.frameNStart = frameN;  // exact frame index
      
      timer_text.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (timer_text.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      timer_text.setAutoDraw(false);
    }
    
    if (timer_text.status === PsychoJS.Status.STARTED){ // only update if being drawn
      timer_text.setText(("Time until departure: " + text_9.toString()), false);
    }
    if ((t > 1.1)) {
        if ((action_2.keys === undefined)) {
            action_2.rt = 1;
        }
        continueRoutine = false;
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    action_execComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function action_execRoutineEnd() {
  return async function () {
    //------Ending Routine 'action_exec'-------
    action_execComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(action_2.corr, level);
    }
    psychoJS.experiment.addData('action_2.keys', action_2.keys);
    if (typeof action_2.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('action_2.rt', action_2.rt);
        }
    
    action_2.stop();
    // the Routine "action_exec" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var temp_array;
var wself1;
var numerator;
var denominator;
var must_be_under;
var _key_try_again_2_allKeys;
var try_again_2Components;
function try_again_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'try_again_2'-------
    t = 0;
    try_again_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    
    
    if ((cs === 0)) {
        retry.finished = true;
        continueRoutine = false;
    }
    
    if ((performance_arr.length>20)) {
        temp_array=performance_arr.slice(-20)
        percent_acc = ecdfArray(temp_array);
        per = percent_acc(Math.abs((0.3 - action_2.rt)));
       
    } else if  ((performance_arr.length>0)) {
        
        percent_acc = ecdfArray(performance_arr);
        //curent attempt 
        per = percent_acc(Math.abs((0.3 - action_2.rt)));
        
    console.log(("now per is" + per.toString()));
       
    } else {
        per=.5;
    
        
    }
    
    
    
    if ((action_2.keys === undefined)) {
        action_2.keys = [];
        action_2.rt = [];
        per=1.1;
     
    } else if ((performance_arr === undefined)) {
        per=.5;
        performance_arr.push(Math.abs(.3-action_2.rt));
        console.log(performance_arr);
    
        
        
    }  else if ((performance_arr.length === 0)) {
        per=.5;
        
        console.log(action_2.rt);
        performance_arr.push(Math.abs(.3-action_2.rt));
        console.log(performance_arr);
    
    
    
        
        
    }  else {
        performance_arr.push(Math.abs(.3-action_2.rt));
        per = percent_acc(Math.abs((0.3 - action_2.rt)));
    
        
           
    }
    
    
    
      
    psychoJS.experiment.addData("cdf_pos", per);
    if ((per < 0.85)) {
        dont_check_again = 1;
        determined_already==0
    } else {
        if (((per > 0.85) && (dont_check_again === 0))) {
            determined_already = 1;
            success = 0;
        }
    }
    
    
    
    
    if ((retry.thisN === 0)) {
        num_actions = 2;
    } else {
        if ((retry.thisN === 1)) {
            num_actions = 3;
        }
    }
    wself1 = c_inelastic;
    if ((num_actions === 2)) {
        numerator = (1 - (c_inelastic + (c_elastic / 2)));
        denominator = (1 - wself1);
        psychoJS.experiment.addData("two_action_numerator", numerator);
        psychoJS.experiment.addData("two_action_denomenator", denominator);
        must_be_under = (1 - (numerator / denominator));
        wself2 = must_be_under;
        psychoJS.experiment.addData("w_self2", must_be_under);
    } else {
        if ((num_actions === 3)) {
            numerator = (1 - (c_inelastic + c_elastic));
            psychoJS.experiment.addData("three_action_numerator", numerator);
            denominator = ((1 - wself1) * (1 - wself2));
            psychoJS.experiment.addData("three_action_denomenator", denominator);
            must_be_under = (1 - (numerator / denominator));
            wself3 = must_be_under;
            psychoJS.experiment.addData("w_self3", must_be_under);
        } else {
            must_be_under = 0.5;
        }
    }
    if ((per < 0.15)) {
        console.log("determined_already is becoming 1");
        if ((num_actions === 2)) {
            if ((per < wself2)) {
                determined_already = 1;
                success = 1;
            }
        } else {
            if ((num_actions === 3)) {
                if ((per < wself3)) {
                    determined_already = 1;
                    success = 1;
                }
            }
        }
    }
    
    psychoJS.experiment.addData("position", Math.abs((0.3 - action_2.rt)));
    psychoJS.experiment.addData("cdf", per);
    psychoJS.experiment.addData("full_vector", performance_arr);
    psychoJS.experiment.addData("forced_actions", forced_actions);
    choose_again_2.alignHoriz = "left";
    if ((plane_selected === plane)) {
        transp = "plane";
    } else {
        if ((plane_selected === train)) {
            transp = "train";
        }
    }
    if (success) {
        got = ("Success! You made it onto the " + transp.toString());
    } else {
        got = ("Sorry. You missed your " + transp.toString());
    }
    if (((forced_actions === true) || (proscribed_actions === 3))) {
        retry_loop = 2;
        continueRoutine = false;
    }
    if (((retry.thisN === 1) && (proscribed_actions === 2))) {
        continueRoutine = false;
    }
    continueRoutine = false;
    
    polygon_10.setFillColor(new util.Color(color_back));
    choose_again_2.setText(((("Enter loading area?\n\nCost: " + 20) + " coins") + "\n\nYES-press \"y\"\nNO-press \"n\" \n\nnote- (timer is running!)"));
    key_try_again_2.keys = undefined;
    key_try_again_2.rt = undefined;
    _key_try_again_2_allKeys = [];
    new_platform_3.setImage('distinguiish_actions/Slide2.jpeg');
    // keep track of which components have finished
    try_again_2Components = [];
    try_again_2Components.push(polygon_10);
    try_again_2Components.push(choose_again_2);
    try_again_2Components.push(key_try_again_2);
    try_again_2Components.push(new_platform_3);
    try_again_2Components.push(text_4);
    
    try_again_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function try_again_2RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'try_again_2'-------
    // get current time
    t = try_again_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    leftTime = new Date();
    timeelapsed = (startTime - leftTime)/1000
    text_9 = Math.round(9+timeelapsed)
    time_s = new Date();
    action_c = Math.floor(time_s.getTime() / 1000);
    
    if (((action_c - action_started) > 10)) {
        action_cr = Math.floor(time_s.getTime() / 1000);
    
        psychoJS.experiment.addData("action_ended", action_cr);
        timedOut= true;
        retry.finished = true;
    
        continueRoutine = false;
    
    }
    
    
    // *polygon_10* updates
    if (t >= 0.0 && polygon_10.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon_10.tStart = t;  // (not accounting for frame time here)
      polygon_10.frameNStart = frameN;  // exact frame index
      
      polygon_10.setAutoDraw(true);
    }

    
    // *choose_again_2* updates
    if (t >= 0.0 && choose_again_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      choose_again_2.tStart = t;  // (not accounting for frame time here)
      choose_again_2.frameNStart = frameN;  // exact frame index
      
      choose_again_2.setAutoDraw(true);
    }

    
    // *key_try_again_2* updates
    if (t >= 0.2 && key_try_again_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_try_again_2.tStart = t;  // (not accounting for frame time here)
      key_try_again_2.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_try_again_2.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_try_again_2.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_try_again_2.clearEvents(); });
    }

    if (key_try_again_2.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_try_again_2.getKeys({keyList: ['y', 'n'], waitRelease: false});
      _key_try_again_2_allKeys = _key_try_again_2_allKeys.concat(theseKeys);
      if (_key_try_again_2_allKeys.length > 0) {
        key_try_again_2.keys = _key_try_again_2_allKeys[_key_try_again_2_allKeys.length - 1].name;  // just the last key pressed
        key_try_again_2.rt = _key_try_again_2_allKeys[_key_try_again_2_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *new_platform_3* updates
    if (t >= 0.0 && new_platform_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      new_platform_3.tStart = t;  // (not accounting for frame time here)
      new_platform_3.frameNStart = frameN;  // exact frame index
      
      new_platform_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 10 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (new_platform_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      new_platform_3.setAutoDraw(false);
    }
    
    // *text_4* updates
    if (t >= 0.0 && text_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_4.tStart = t;  // (not accounting for frame time here)
      text_4.frameNStart = frameN;  // exact frame index
      
      text_4.setAutoDraw(true);
    }

    frameRemains = 0.0 + 10 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_4.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    try_again_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function try_again_2RoutineEnd() {
  return async function () {
    //------Ending Routine 'try_again_2'-------
    try_again_2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(key_try_again_2.corr, level);
    }
    psychoJS.experiment.addData('key_try_again_2.keys', key_try_again_2.keys);
    if (typeof key_try_again_2.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_try_again_2.rt', key_try_again_2.rt);
        routineTimer.reset();
        }
    
    key_try_again_2.stop();
    if (((key_try_again_2.keys === "y") || (trials_task < total_num_forced))) {
        continueRoutine = true;
        num_actions += 1;
    } else {
        if ((key_try_again_2.keys === "n")) {
            continueRoutine = false;
            retry.finished = true;
        }
    }
    
    // the Routine "try_again_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var ok_waitComponents;
function ok_waitRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'ok_wait'-------
    t = 0;
    ok_waitClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    
    
    polygon.setFillColor(new util.Color(color_back));
    if ((proscribed_actions === 3)) {
        continueRoutine = false;
    } else {
        if ((proscribed_actions === 2)) {
            timedOut = false;
        } else {
            if (((forced_actions === true) && (num_actions < 4))) {
                continueRoutine = false;
            }
        }
    }
    
    final_state_supposed_to_5.setImage(end_island);
    departure_state_4.setImage(beg_island);
    // keep track of which components have finished
    ok_waitComponents = [];
    ok_waitComponents.push(polygon);
    ok_waitComponents.push(Computer_Selects);
    ok_waitComponents.push(final_state_supposed_to_5);
    ok_waitComponents.push(inteded_location_5);
    ok_waitComponents.push(text_timer2_2);
    ok_waitComponents.push(departure_state_4);
    
    ok_waitComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function ok_waitRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'ok_wait'-------
    // get current time
    t = ok_waitClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    leftTime = new Date();
    timeelapsed = (startTime - leftTime)/1000
    text_9 = Math.round(3+timeelapsed)
    time_s = new Date();
    action_c = Math.floor(time_s.getTime() / 1000);
    
    
    // *polygon* updates
    if (t >= 0.0 && polygon.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon.tStart = t;  // (not accounting for frame time here)
      polygon.frameNStart = frameN;  // exact frame index
      
      polygon.setAutoDraw(true);
    }

    
    // *Computer_Selects* updates
    if (t >= 0 && Computer_Selects.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Computer_Selects.tStart = t;  // (not accounting for frame time here)
      Computer_Selects.frameNStart = frameN;  // exact frame index
      
      Computer_Selects.setAutoDraw(true);
    }

    
    // *final_state_supposed_to_5* updates
    if (t >= 0 && final_state_supposed_to_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      final_state_supposed_to_5.tStart = t;  // (not accounting for frame time here)
      final_state_supposed_to_5.frameNStart = frameN;  // exact frame index
      
      final_state_supposed_to_5.setAutoDraw(true);
    }

    
    // *inteded_location_5* updates
    if (t >= 0.0 && inteded_location_5.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      inteded_location_5.tStart = t;  // (not accounting for frame time here)
      inteded_location_5.frameNStart = frameN;  // exact frame index
      
      inteded_location_5.setAutoDraw(true);
    }

    if (((action_c - action_started) > 3.6)) {
        retry.finished = true;
        continueRoutine = false;
        action_cr = Math.floor(time_s.getTime() / 1000);
        psychoJS.experiment.addData("action_ended", action_cr);
    
    }
    
    
    // *text_timer2_2* updates
    if (t >= 0.0 && text_timer2_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_timer2_2.tStart = t;  // (not accounting for frame time here)
      text_timer2_2.frameNStart = frameN;  // exact frame index
      
      text_timer2_2.setAutoDraw(true);
    }

    
    if (text_timer2_2.status === PsychoJS.Status.STARTED){ // only update if being drawn
      text_timer2_2.setText(("Time until departure: " + text_9.toString()), false);
    }
    
    // *departure_state_4* updates
    if (t >= 0 && departure_state_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      departure_state_4.tStart = t;  // (not accounting for frame time here)
      departure_state_4.frameNStart = frameN;  // exact frame index
      
      departure_state_4.setAutoDraw(true);
    }

    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    ok_waitComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function ok_waitRoutineEnd() {
  return async function () {
    //------Ending Routine 'ok_wait'-------
    ok_waitComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // the Routine "ok_wait" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var action_ending_now;
var timedOUTComponents;
function timedOUTRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'timedOUT'-------
    t = 0;
    timedOUTClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(1.300000);
    // update component parameters for each repeat
    const time_end = new Date();
    
    const trial_ended = Math.floor(time_end.getTime() / 1000);
    
    action_ending_now = Math.floor(time_end.getTime() / 1000);
    psychoJS.experiment.addData("action_ended", action_ending_now);
    
    psychoJS.experiment.addData("trial_ended", trial_ended);
    
    
    if ((timedOut === true)) {
        continueRoutine = true;
    } else {
        continueRoutine = false;
    }
    
    polygon_4.setFillColor(new util.Color(color_back));
    // keep track of which components have finished
    timedOUTComponents = [];
    timedOUTComponents.push(polygon_4);
    timedOUTComponents.push(text_28);
    
    timedOUTComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function timedOUTRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'timedOUT'-------
    // get current time
    t = timedOUTClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *polygon_4* updates
    if (t >= 0.0 && polygon_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon_4.tStart = t;  // (not accounting for frame time here)
      polygon_4.frameNStart = frameN;  // exact frame index
      
      polygon_4.setAutoDraw(true);
    }

    frameRemains = 0.0 + 1.3 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (polygon_4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      polygon_4.setAutoDraw(false);
    }
    
    // *text_28* updates
    if (t >= 0.0 && text_28.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_28.tStart = t;  // (not accounting for frame time here)
      text_28.frameNStart = frameN;  // exact frame index
      
      text_28.setAutoDraw(true);
    }

    frameRemains = 0.0 + 1.3 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_28.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_28.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    timedOUTComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function timedOUTRoutineEnd() {
  return async function () {
    //------Ending Routine 'timedOUT'-------
    timedOUTComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    return Scheduler.Event.NEXT;
  };
}


var task_yet;
var not_task_yet;
var only_if_cs_1;
var only_if_cs_2;
var MADEIT;
var dep_depends;
var ast;
var time_for_plane;
var time_for_walking;
var total_spent;
var got_there;
var suc;
var total_reward;
var total_actions;
var se_number;
var _key_resp_13_allKeys;
var feedback_2Components;
function feedback_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'feedback_2'-------
    t = 0;
    feedback_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    if ((block.thisN < 6)) {
        task_yet = 0;
        not_task_yet = 13;
    } else {
        task_yet = 13;
        not_task_yet = 0;
    }
    if ((block.thisN < 3)) {
        session1 = true;
    } else {
        session1 = false;
    }
    if ((block.thisN > 2)) {
        if ((cs === 1)) {
            only_if_cs_1 = 15;
        } else {
            only_if_cs_1 = 0;
        }
    } else {
        only_if_cs_1 = 0;
    }
    if ((cs === 1)) {
        only_if_cs_2 = 15;
    } else {
        only_if_cs_2 = 0;
    }
    if ((plane_selected === plane)) {
        transp = "plane";
    } else {
        transp = "train";
    }
    if ((opt_in.keys === "1")) {
        num_actions = 1;
    } else {
        if ((opt_in.keys === "2")) {
            num_actions = 2;
        } else {
            if (((opt_in.keys === "3") || (forced_actions === true))) {
                num_actions = 3;
            } else {
                if ((opt_in.keys === "9")) {
                    num_actions = 0;
                }
            }
        }
    }
    console.log(("determined already" + determined_already.toString()));
    if ((cs === 1)) {
        if ((num_actions > 1)) {
            if ((determined_already === 0)) {
                psychoJS.experiment.addData("probablistic_press", 1);
            }
            if ((num_actions === 2)) {
                if ((two_ticket_success[trials_task.thisN] === 1)) {
                    success = true;
                    psychoJS.experiment.addData("pressed_ontime", 1);
                } else {
                    success = false;
                    psychoJS.experiment.addData("pressed_ontime", 0);
                }
            } else {
                if ((num_actions === 3)) {
                    if ((three_ticket_success[trials_task.thisN] === 1)) {
                        success = true;
                        psychoJS.experiment.addData("pressed_ontime", 1);
                    } else {
                        success = false;
                        psychoJS.experiment.addData("pressed_ontime", 0);
                    }
                }
            }
        }
        if ((determined_already === 1)) {
            psychoJS.experiment.addData("probablistic_press", 0);
        }
        console.log("he succesfully jumped ", success.toString());
        if ((num_actions === 1)) {
            if ((single_ticket_success[trials_task.thisN] === 1)) {
                MADEIT = 1;
            } else {
                MADEIT = 0;
            }
        } else {
            if ((num_actions === 2)) {
                if ((two_ticket_success[trials_task.thisN] === 1)) {
                    MADEIT = 1;
                } else {
                    MADEIT = 0;
                }
            } else {
                if ((num_actions === 3)) {
                    if ((three_ticket_success[trials_task.thisN] === 1)) {
                        MADEIT = 1;
                    } else {
                        MADEIT = 0;
                    }
                }
            }
        }
    } else {
        MADEIT = 0;
    }
    specify_reward_2.alignHoriz = "left";
    
    polygon_11.setFillColor(new util.Color(color_back));
    if ((cs === 0)) {
        success = 0;
        got = "Did not try";
        dep_time = 2;
        dep_time_first = 0;
        dep_depends = 7.5;
    } else {
        dep_time = 2.5;
        dep_time_first = 2.5;
        dep_depends = 5.5;
    }
    ast = (c_inelastic * 1000);
    r = randint(0, 1000);
    
    
    
    
    
    if (MADEIT === 1) {
        dplace = action_transitions[plane_selected];
    
        plane_to_show = plane_selected;
        if ((session1 === true)) {
            time_for_plane = 15;
            time_for_walking = 0;
    
        } else {
            time_for_plane = 0;
            time_for_walking = 0;
    
        }
    
    } else {
        dplace = state_transitions[beg_island];
    
        plane_to_show = transport[0];
        if ((session1 === true)) {
            time_for_walking = 15;
        } else {
            time_for_walking = 0;
        }
        time_for_plane = 0;
    }
    if ((left_plane === plane_to_show)) {
        pos_c = [(- 0.25), 0.25];
    } else {
        if ((right_plane === plane_to_show)) {
            pos_c = [0.25, 0.25];
        } else {
            pos_c = [0, 0.15];
        }
    }
    
    
    
    
    
    
    specify_reward.alignHoriz = "left";
    total_spent = 0;
    if ((dplace === end_island)) {
        got_there = true;
        tracking_success.push(1);
        suc = "You WIN!";
    } else {
        got_there = false;
        tracking_success.push(0);
        suc = "Sorry, you missed the treasure";
    }
    if ((cs === 0)) {
        num_actions = 0;
    }
    if (got_there) {
        total_reward = 150;
    } else {
        total_reward = 0;
    }
    if ((forced_actions === false)) {
        if ((num_actions === 0)) {
            total_earned += total_reward;
            total_spent = 0;
        } else {
            if ((num_actions === 1)) {
                total_earned += (total_reward - 40);
                total_spent = 40;
            } else {
                if ((num_actions === 2)) {
                    total_earned += (total_reward - 60);
                    total_spent = 60;
                } else {
                    if ((num_actions === 3)) {
                        total_earned += (total_reward - 80);
                        total_spent = 80;
                    }
                }
            }
        }
    } else {
        total_earned += total_reward;
    }
    
    departure_state.setImage(beg_island);
    final_state.setImage(dplace);
    specify_reward.setText((((((((suc.toString() + "\n\nCoins spent on tickets: ") + total_spent.toString()) + "\nTotal earned on trip: ") + (total_reward - total_spent).toString()) + " coins") + "\nTotal Winnings: ") + total_earned.toString()));
    tran_selected.setPos(pos_c);
    tran_selected.setImage(plane_to_show);
    final_state_supposed_to.setImage(end_island);
    if ((cs === 0)) {
        num_actions = 0;
    }
    total_actions = num_actions;
    psychoJS.experiment.addData("total_actions", total_actions);
    psychoJS.experiment.addData("trial_reward", total_reward);
    psychoJS.experiment.addData("total_reward", total_earned);
    psychoJS.experiment.addData("destination", dplace);
    psychoJS.experiment.addData("method_used", plane_to_show);
    psychoJS.experiment.addData("boarded", success);
    
    if (((success === 1) || (success === true))) {
        psychoJS.experiment.addData("jumped_ontime", 1);
    } else {
        if (((success === 0) || (success === false))) {
            psychoJS.experiment.addData("jumped_ontime", 0);
        }
    }
    se_number = 3;
    if ((total_actions === 1)) {
        se_number = 3;
    } else {
        if ((total_actions === 3)) {
            se_number = 2;
        } else {
            if ((total_actions === 2)) {
                se_number = 1;
            }
        }
    }
    
    image_8.setColor(new util.Color(color_back));
    key_resp_13.keys = undefined;
    key_resp_13.rt = undefined;
    _key_resp_13_allKeys = [];
    selected_transport.setImage(plane_selected);
    new_platform_4.setImage((("distinguiish_actions/Slide" + se_number.toString()) + ".jpeg"));
    specify_reward_2.setText((((((suc.toString() + "\n\nCoins spent on tickets: ") + total_spent.toString()) + "\nTotal earned on trip: ") + (total_reward - total_spent).toString()) + " coins"));
    // keep track of which components have finished
    feedback_2Components = [];
    feedback_2Components.push(polygon_11);
    feedback_2Components.push(departure_state);
    feedback_2Components.push(final_state);
    feedback_2Components.push(specify_reward);
    feedback_2Components.push(tran_selected);
    feedback_2Components.push(final_state_supposed_to);
    feedback_2Components.push(inteded_location);
    feedback_2Components.push(text_17);
    feedback_2Components.push(image_8);
    feedback_2Components.push(key_resp_13);
    feedback_2Components.push(selected_transport);
    feedback_2Components.push(walking);
    feedback_2Components.push(new_platform_4);
    feedback_2Components.push(selected_transport_3);
    feedback_2Components.push(specify_reward_2);
    feedback_2Components.push(action_reminder);
    
    feedback_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function feedback_2RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'feedback_2'-------
    // get current time
    t = feedback_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *polygon_11* updates
    if (t >= 0.0 && polygon_11.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon_11.tStart = t;  // (not accounting for frame time here)
      polygon_11.frameNStart = frameN;  // exact frame index
      
      polygon_11.setAutoDraw(true);
    }

    frameRemains = 0.0 + 15 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (polygon_11.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      polygon_11.setAutoDraw(false);
    }
    
    // *departure_state* updates
    if (t >= 0 && departure_state.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      departure_state.tStart = t;  // (not accounting for frame time here)
      departure_state.frameNStart = frameN;  // exact frame index
      
      departure_state.setAutoDraw(true);
    }

    frameRemains = 0 + 15 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (departure_state.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      departure_state.setAutoDraw(false);
    }
    
    // *final_state* updates
    if (t >= 2 && final_state.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      final_state.tStart = t;  // (not accounting for frame time here)
      final_state.frameNStart = frameN;  // exact frame index
      
      final_state.setAutoDraw(true);
    }

    frameRemains = 2 + 13 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (final_state.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      final_state.setAutoDraw(false);
    }
    
    // *specify_reward* updates
    if (t >= 2 && specify_reward.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      specify_reward.tStart = t;  // (not accounting for frame time here)
      specify_reward.frameNStart = frameN;  // exact frame index
      
      specify_reward.setAutoDraw(true);
    }

    frameRemains = 2 + task_yet - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (specify_reward.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      specify_reward.setAutoDraw(false);
    }
    
    // *tran_selected* updates
    if (t >= 1 && tran_selected.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      tran_selected.tStart = t;  // (not accounting for frame time here)
      tran_selected.frameNStart = frameN;  // exact frame index
      
      tran_selected.setAutoDraw(true);
    }

    frameRemains = 1 + time_for_plane - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (tran_selected.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      tran_selected.setAutoDraw(false);
    }
    
    // *final_state_supposed_to* updates
    if (t >= 0 && final_state_supposed_to.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      final_state_supposed_to.tStart = t;  // (not accounting for frame time here)
      final_state_supposed_to.frameNStart = frameN;  // exact frame index
      
      final_state_supposed_to.setAutoDraw(true);
    }

    frameRemains = 0 + 15 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (final_state_supposed_to.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      final_state_supposed_to.setAutoDraw(false);
    }
    
    // *inteded_location* updates
    if (t >= 0.0 && inteded_location.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      inteded_location.tStart = t;  // (not accounting for frame time here)
      inteded_location.frameNStart = frameN;  // exact frame index
      
      inteded_location.setAutoDraw(true);
    }

    frameRemains = 0.0 + 15 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (inteded_location.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      inteded_location.setAutoDraw(false);
    }
    
    // *text_17* updates
    if (t >= 3 && text_17.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_17.tStart = t;  // (not accounting for frame time here)
      text_17.frameNStart = frameN;  // exact frame index
      
      text_17.setAutoDraw(true);
    }

    frameRemains = 3 + 12 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_17.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_17.setAutoDraw(false);
    }
    
    // *image_8* updates
    if (t >= 0.0 && image_8.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      image_8.tStart = t;  // (not accounting for frame time here)
      image_8.frameNStart = frameN;  // exact frame index
      
      image_8.setAutoDraw(true);
    }

    frameRemains = 0.0 + 15 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (image_8.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      image_8.setAutoDraw(false);
    }
    
    // *key_resp_13* updates
    if (t >= 3 && key_resp_13.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_13.tStart = t;  // (not accounting for frame time here)
      key_resp_13.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_13.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_13.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_13.clearEvents(); });
    }

    frameRemains = 3 + 12 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (key_resp_13.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      key_resp_13.status = PsychoJS.Status.FINISHED;
  }

    if (key_resp_13.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_13.getKeys({keyList: ['space', 'right'], waitRelease: false});
      _key_resp_13_allKeys = _key_resp_13_allKeys.concat(theseKeys);
      if (_key_resp_13_allKeys.length > 0) {
        key_resp_13.keys = _key_resp_13_allKeys[_key_resp_13_allKeys.length - 1].name;  // just the last key pressed
        key_resp_13.rt = _key_resp_13_allKeys[_key_resp_13_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    
    // *selected_transport* updates
    if (t >= 0.0 && selected_transport.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      selected_transport.tStart = t;  // (not accounting for frame time here)
      selected_transport.frameNStart = frameN;  // exact frame index
      
      selected_transport.setAutoDraw(true);
    }

    frameRemains = 0.0 + only_if_cs_1 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (selected_transport.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      selected_transport.setAutoDraw(false);
    }
    
    // *walking* updates
    if (t >= 0.0 && walking.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      walking.tStart = t;  // (not accounting for frame time here)
      walking.frameNStart = frameN;  // exact frame index
      
      walking.setAutoDraw(true);
    }

    frameRemains = 0.0 + time_for_walking - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (walking.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      walking.setAutoDraw(false);
    }
    
    // *new_platform_4* updates
    if (t >= 0.0 && new_platform_4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      new_platform_4.tStart = t;  // (not accounting for frame time here)
      new_platform_4.frameNStart = frameN;  // exact frame index
      
      new_platform_4.setAutoDraw(true);
    }

    frameRemains = 0.0 + only_if_cs_2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (new_platform_4.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      new_platform_4.setAutoDraw(false);
    }
    
    // *selected_transport_3* updates
    if (t >= 0.0 && selected_transport_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      selected_transport_3.tStart = t;  // (not accounting for frame time here)
      selected_transport_3.frameNStart = frameN;  // exact frame index
      
      selected_transport_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + only_if_cs_1 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (selected_transport_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      selected_transport_3.setAutoDraw(false);
    }
    
    // *specify_reward_2* updates
    if (t >= 2 && specify_reward_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      specify_reward_2.tStart = t;  // (not accounting for frame time here)
      specify_reward_2.frameNStart = frameN;  // exact frame index
      
      specify_reward_2.setAutoDraw(true);
    }

    frameRemains = 2 + not_task_yet - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (specify_reward_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      specify_reward_2.setAutoDraw(false);
    }
    
    // *action_reminder* updates
    if (t >= 0.0 && action_reminder.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      action_reminder.tStart = t;  // (not accounting for frame time here)
      action_reminder.frameNStart = frameN;  // exact frame index
      
      action_reminder.setAutoDraw(true);
    }

    frameRemains = 0.0 + only_if_cs_2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (action_reminder.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      action_reminder.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    feedback_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function feedback_2RoutineEnd() {
  return async function () {
    //------Ending Routine 'feedback_2'-------
    feedback_2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    determined_already = 0;
    success = false;
    
    const datess = new Date();
    
    const trial_ended_real = Math.floor(datess.getTime() / 1000);
    
    psychoJS.experiment.addData("trial_ended_real", trial_ended_real);
    
    success = 0;
    success_act = [];
    
    console.log("we do finish feedback");
    success = false;
    
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(key_resp_13.corr, level);
    }
    psychoJS.experiment.addData('key_resp_13.keys', key_resp_13.keys);
    if (typeof key_resp_13.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_13.rt', key_resp_13.rt);
        routineTimer.reset();
        }
    
    key_resp_13.stop();
    // the Routine "feedback_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var excitedComponents;
function excitedRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'excited'-------
    t = 0;
    excitedClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(25.000000);
    // update component parameters for each repeat
    if ((block.thisN > 5)) {
        if ((((cs === 0) && (total_reward === 150)) && (trials_last_query_s > 2))) {
            trials_last_query_s = 0;
            trials_last_query_e = 0;
            opt_out_won_e += 1;
            continueRoutine = true;
        } else {
            if (((((cs === 0) && (total_reward === 0)) && (opt_out_lost_e < 6)) && (trials_last_query_e > 3))) {
                opt_out_lost_e += 1;
                trials_last_query_s += 1;
                trials_last_query_e = 0;
                continueRoutine = true;
            } else {
                if (((((((cs === 1) && (trials_task.thisN > 10)) && ((c_elastic + c_inelastic) > 0.6)) && (num_actions === 3)) && (opt_in_lost_high_e < 4)) && (trials_last_query_e > 3))) {
                    opt_in_lost_high_e += 1;
                    trials_last_query_s += 1;
                    trials_last_query_e = 0;
                    continueRoutine = true;
                } else {
                    if (((((((trials_task.thisN > 10) && (c_inelastic > 0.6)) && (num_actions === 1)) && (total_reward === 0)) && (opt_in_lost_high_e < 4)) && (trials_last_query_e > 3))) {
                        opt_in_lost_high_e += 1;
                        trials_last_query_s += 1;
                        trials_last_query_e = 0;
                        continueRoutine = true;
                    } else {
                        if (((((cs === 1) && (total_reward === 0)) && (opt_in_lost_e < 4)) && (trials_last_query_e > 3))) {
                            opt_in_lost_e += 1;
                            trials_last_query_s += 1;
                            trials_last_query_e = 0;
                            continueRoutine = true;
                        } else {
                            if ((((((cs === 1) && (total_reward === 150)) && (trials_task.thisN < 10)) && (opt_in_won_e < 6)) && (trials_last_query_e > 3))) {
                                opt_in_won_e += 1;
                                trials_last_query_s += 1;
                                trials_last_query_e = 0;
                                continueRoutine = true;
                            } else {
                                if (((((((cs === 1) && (total_reward === 150)) && (trials_task.thisN > 10)) && (opt_in_won_e < 6)) && ((c_elastic + c_inelastic) < 0.4)) && (trials_last_query_e > 3))) {
                                    opt_in_won_e += 1;
                                    trials_last_query_e = 0;
                                    trials_last_query_s += 1;
                                    continueRoutine = true;
                                } else {
                                    trials_last_query_e += 1;
                                    trials_last_query_s += 1;
                                    continueRoutine = false;
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        trials_last_query_e += 1;
        trials_last_query_s += 1;
        continueRoutine = false;
    }
    excited_title.alignHoriz = "left";
    
    excited_query.alignHoriz = "left";
    
    polygon_18.setFillColor(new util.Color(color_back));
    slider_excited.reset()
    // keep track of which components have finished
    excitedComponents = [];
    excitedComponents.push(polygon_18);
    excitedComponents.push(excited_query);
    excitedComponents.push(excited_title);
    excitedComponents.push(slider_excited);
    
    excitedComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function excitedRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'excited'-------
    // get current time
    t = excitedClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *polygon_18* updates
    if (t >= 0.0 && polygon_18.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon_18.tStart = t;  // (not accounting for frame time here)
      polygon_18.frameNStart = frameN;  // exact frame index
      
      polygon_18.setAutoDraw(true);
    }

    frameRemains = 0.0 + 25 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (polygon_18.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      polygon_18.setAutoDraw(false);
    }
    
    // *excited_query* updates
    if (t >= 0 && excited_query.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      excited_query.tStart = t;  // (not accounting for frame time here)
      excited_query.frameNStart = frameN;  // exact frame index
      
      excited_query.setAutoDraw(true);
    }

    frameRemains = 0 + 25 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (excited_query.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      excited_query.setAutoDraw(false);
    }
    
    // *excited_title* updates
    if (t >= 0.0 && excited_title.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      excited_title.tStart = t;  // (not accounting for frame time here)
      excited_title.frameNStart = frameN;  // exact frame index
      
      excited_title.setAutoDraw(true);
    }

    frameRemains = 0.0 + 25 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (excited_title.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      excited_title.setAutoDraw(false);
    }
    
    // *slider_excited* updates
    if (t >= 1 && slider_excited.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      slider_excited.tStart = t;  // (not accounting for frame time here)
      slider_excited.frameNStart = frameN;  // exact frame index
      
      slider_excited.setAutoDraw(true);
    }

    frameRemains = 1 + 24 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (slider_excited.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      slider_excited.setAutoDraw(false);
    }
    
    // Check slider_excited for response to end routine
    if (slider_excited.getRating() !== undefined && slider_excited.status === PsychoJS.Status.STARTED) {
      continueRoutine = false; }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    excitedComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function excitedRoutineEnd() {
  return async function () {
    //------Ending Routine 'excited'-------
    excitedComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData("q_out_out_won", opt_out_won);
    psychoJS.experiment.addData("q_opt_out_lost", opt_out_lost);
    psychoJS.experiment.addData("q_opt_in_lost_high", opt_in_lost_high);
    psychoJS.experiment.addData("q_opt_in_lost_regular", opt_in_lost);
    psychoJS.experiment.addData("q_opt_in_won", opt_in_won);
    
    psychoJS.experiment.addData('slider_excited.response', slider_excited.getRating());
    psychoJS.experiment.addData('slider_excited.rt', slider_excited.getRT());
    return Scheduler.Event.NEXT;
  };
}


var contentComponents;
function contentRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'content'-------
    t = 0;
    contentClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(25.000000);
    // update component parameters for each repeat
    if ((block.thisN > 5)) {
        if ((((cs === 0) && (total_reward === 150)) && (trials_last_query_t > 2))) {
            trials_last_query = 0;
            trials_last_query_t = 0;
            opt_out_won += 1;
            continueRoutine = true;
        } else {
            if (((((cs === 0) && (total_reward === 0)) && (opt_out_lost < 6)) && (trials_last_query > 3))) {
                opt_out_lost += 1;
                trials_last_query_t += 1;
                trials_last_query = 0;
                continueRoutine = true;
            } else {
                if (((((((cs === 1) && (trials_task.thisN > 10)) && ((c_elastic + c_inelastic) > 0.6)) && (trials_last_query > 3)) && (num_actions === 3)) && (opt_in_lost_high < 4))) {
                    opt_in_lost_high += 1;
                    trials_last_query_t += 1;
                    trials_last_query = 0;
                    continueRoutine = true;
                } else {
                    if (((((((trials_task.thisN > 10) && (c_inelastic > 0.6)) && (num_actions === 1)) && (trials_last_query > 3)) && (total_reward === 0)) && (opt_in_lost_high < 4))) {
                        opt_in_lost_high += 1;
                        trials_last_query_t += 1;
                        trials_last_query = 0;
                        continueRoutine = true;
                    } else {
                        if (((((cs === 1) && (total_reward === 0)) && (opt_in_lost < 4)) && (trials_last_query > 3))) {
                            opt_in_lost += 1;
                            trials_last_query_t += 1;
                            trials_last_query = 0;
                            continueRoutine = true;
                        } else {
                            if ((((((cs === 1) && (total_reward === 150)) && (trials_last_query > 3)) && (trials_task.thisN < 15)) && (opt_in_won < 6))) {
                                opt_in_won += 1;
                                trials_last_query_t += 1;
                                trials_last_query = 0;
                                continueRoutine = true;
                            } else {
                                if (((((((cs === 1) && (total_reward === 150)) && (trials_last_query > 3)) && (trials_task.thisN > 10)) && (opt_in_won < 6)) && ((c_elastic + c_inelastic) < 0.4))) {
                                    opt_in_won += 1;
                                    trials_last_query_t += 1;
                                    trials_last_query = 0;
                                    continueRoutine = true;
                                } else {
                                    trials_last_query += 1;
                                    trials_last_query_t += 1;
                                    continueRoutine = false;
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        trials_last_query += 1;
        trials_last_query_t += 1;
        continueRoutine = false;
    }
    
    content_query_2.alignHoriz = "left";
    content_title.alignHoriz = "left";
    
    polygon_19.setFillColor(new util.Color(color_back));
    slider_7.reset()
    // keep track of which components have finished
    contentComponents = [];
    contentComponents.push(polygon_19);
    contentComponents.push(content_query_2);
    contentComponents.push(content_title);
    contentComponents.push(slider_7);
    
    contentComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function contentRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'content'-------
    // get current time
    t = contentClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *polygon_19* updates
    if (t >= 0.0 && polygon_19.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon_19.tStart = t;  // (not accounting for frame time here)
      polygon_19.frameNStart = frameN;  // exact frame index
      
      polygon_19.setAutoDraw(true);
    }

    frameRemains = 0.0 + 25 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (polygon_19.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      polygon_19.setAutoDraw(false);
    }
    
    // *content_query_2* updates
    if (t >= 0 && content_query_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      content_query_2.tStart = t;  // (not accounting for frame time here)
      content_query_2.frameNStart = frameN;  // exact frame index
      
      content_query_2.setAutoDraw(true);
    }

    frameRemains = 0 + 25 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (content_query_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      content_query_2.setAutoDraw(false);
    }
    
    // *content_title* updates
    if (t >= 0.0 && content_title.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      content_title.tStart = t;  // (not accounting for frame time here)
      content_title.frameNStart = frameN;  // exact frame index
      
      content_title.setAutoDraw(true);
    }

    frameRemains = 0.0 + 25 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (content_title.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      content_title.setAutoDraw(false);
    }
    
    // *slider_7* updates
    if (t >= 1 && slider_7.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      slider_7.tStart = t;  // (not accounting for frame time here)
      slider_7.frameNStart = frameN;  // exact frame index
      
      slider_7.setAutoDraw(true);
    }

    frameRemains = 1 + 24 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (slider_7.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      slider_7.setAutoDraw(false);
    }
    
    // Check slider_7 for response to end routine
    if (slider_7.getRating() !== undefined && slider_7.status === PsychoJS.Status.STARTED) {
      continueRoutine = false; }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    contentComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function contentRoutineEnd() {
  return async function () {
    //------Ending Routine 'content'-------
    contentComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData("q_out_out_won", opt_out_won);
    psychoJS.experiment.addData("q_opt_out_lost", opt_out_lost);
    psychoJS.experiment.addData("q_opt_in_lost_high", opt_in_lost_high);
    psychoJS.experiment.addData("q_opt_in_lost_regular", opt_in_lost);
    psychoJS.experiment.addData("q_opt_in_won", opt_in_won);
    
    psychoJS.experiment.addData('slider_7.response', slider_7.getRating());
    psychoJS.experiment.addData('slider_7.rt', slider_7.getRT());
    return Scheduler.Event.NEXT;
  };
}


var pos_query;
var num_tickets_queryComponents;
function num_tickets_queryRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'num_tickets_query'-------
    t = 0;
    num_tickets_queryClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(25.000000);
    // update component parameters for each repeat
    document.body.style.cursor = "auto";
    if ((plane_selected === left_plane)) {
        pos_query = [(- 0.1), 0];
    } else {
        pos_query = [(- 0.85), 0];
    }
    
    polygon_24.setFillColor(new util.Color(color_back));
    slider_3.reset()
    // keep track of which components have finished
    num_tickets_queryComponents = [];
    num_tickets_queryComponents.push(polygon_24);
    num_tickets_queryComponents.push(ticket_officer_query_3);
    num_tickets_queryComponents.push(slider_3);
    
    num_tickets_queryComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function num_tickets_queryRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'num_tickets_query'-------
    // get current time
    t = num_tickets_queryClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *polygon_24* updates
    if (t >= 0.0 && polygon_24.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon_24.tStart = t;  // (not accounting for frame time here)
      polygon_24.frameNStart = frameN;  // exact frame index
      
      polygon_24.setAutoDraw(true);
    }

    frameRemains = 0.0 + 25 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (polygon_24.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      polygon_24.setAutoDraw(false);
    }
    
    // *ticket_officer_query_3* updates
    if (t >= 0 && ticket_officer_query_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ticket_officer_query_3.tStart = t;  // (not accounting for frame time here)
      ticket_officer_query_3.frameNStart = frameN;  // exact frame index
      
      ticket_officer_query_3.setAutoDraw(true);
    }

    frameRemains = 0 + 25 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (ticket_officer_query_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      ticket_officer_query_3.setAutoDraw(false);
    }
    
    // *slider_3* updates
    if (t >= 0.0 && slider_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      slider_3.tStart = t;  // (not accounting for frame time here)
      slider_3.frameNStart = frameN;  // exact frame index
      
      slider_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 25 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (slider_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      slider_3.setAutoDraw(false);
    }
    
    // Check slider_3 for response to end routine
    if (slider_3.getRating() !== undefined && slider_3.status === PsychoJS.Status.STARTED) {
      continueRoutine = false; }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    num_tickets_queryComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function num_tickets_queryRoutineEnd() {
  return async function () {
    //------Ending Routine 'num_tickets_query'-------
    num_tickets_queryComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('slider_3.response', slider_3.getRating());
    psychoJS.experiment.addData('slider_3.rt', slider_3.getRT());
    return Scheduler.Event.NEXT;
  };
}


var last_message;
var _key_resp_10_allKeys;
var breather_2Components;
function breather_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'breather_2'-------
    t = 0;
    breather_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(200.000000);
    // update component parameters for each repeat
    
    
    last_message = "You are done with this planet.\n\nTake a breather. Press Space when you are ready to proceed to the next planet";
    
    
    text_16.setText(last_message);
    key_resp_10.keys = undefined;
    key_resp_10.rt = undefined;
    _key_resp_10_allKeys = [];
    // keep track of which components have finished
    breather_2Components = [];
    breather_2Components.push(text_16);
    breather_2Components.push(key_resp_10);
    
    breather_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function breather_2RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'breather_2'-------
    // get current time
    t = breather_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_16* updates
    if (t >= 0.0 && text_16.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_16.tStart = t;  // (not accounting for frame time here)
      text_16.frameNStart = frameN;  // exact frame index
      
      text_16.setAutoDraw(true);
    }

    frameRemains = 0.0 + 200 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_16.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_16.setAutoDraw(false);
    }
    
    // *key_resp_10* updates
    if (t >= 0.0 && key_resp_10.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_10.tStart = t;  // (not accounting for frame time here)
      key_resp_10.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_10.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_10.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_10.clearEvents(); });
    }

    frameRemains = 0.0 + 200 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (key_resp_10.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      key_resp_10.status = PsychoJS.Status.FINISHED;
  }

    if (key_resp_10.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_10.getKeys({keyList: ['space'], waitRelease: false});
      _key_resp_10_allKeys = _key_resp_10_allKeys.concat(theseKeys);
      if (_key_resp_10_allKeys.length > 0) {
        key_resp_10.keys = _key_resp_10_allKeys[_key_resp_10_allKeys.length - 1].name;  // just the last key pressed
        key_resp_10.rt = _key_resp_10_allKeys[_key_resp_10_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    breather_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function breather_2RoutineEnd() {
  return async function () {
    //------Ending Routine 'breather_2'-------
    breather_2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(key_resp_10.corr, level);
    }
    psychoJS.experiment.addData('key_resp_10.keys', key_resp_10.keys);
    if (typeof key_resp_10.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_10.rt', key_resp_10.rt);
        routineTimer.reset();
        }
    
    key_resp_10.stop();
    return Scheduler.Event.NEXT;
  };
}


var weight;
var rat_indifferent;
var win_p;
var lose_prob;
var only_if_slide;
var risk_slide;
var skip_first;
var _key_resp_16_allKeys;
var risk_choices_2Components;
function risk_choices_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'risk_choices_2'-------
    t = 0;
    risk_choices_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    function sigmoid(x) {
      return 1 / (1 + Math.exp(-x));
    }
    
    function logisticRegression(features, labels, iterations, learningRate) {
      features = features.map(feature => [1, feature]);
    
      let weights = Array(features[0].length).fill(0);
    
      for (let i = 0; i < iterations; i++) {
        const predictions = features.map(point => sigmoid(dotProduct(point, weights)));
    
        // calculate errors
        const errors = labels.map((label, index) => label - predictions[index]);
    
        // calculate gradients
        const gradients = features.map(
          (point, index) => point.map(value => value * errors[index])
        );
    
        // calculate mean gradients
        const meanGradients = gradients.reduce(
          (accumulator, currentValue) =>
            accumulator.map((value, index) => value + currentValue[index])
        ).map(value => value * (1 / features.length));
    
        // update weights
        weights = weights.map(
          (weight, index) => weight + learningRate * meanGradients[index]
        );
      }
    
      return weights;
    }
    
    // dot product function
    function dotProduct(a, b) {
      return a.reduce((accumulator, currentValue, currentIndex) =>
        accumulator + currentValue * b[currentIndex],
        0
      );
    }
    
    console.log(("sum is" + util.sum(la_opt_in).toString()));
    console.log(("total is" + la_opt_in.toString()));
    if ((util.sum(la_opt_in) === la_opt_in.length)) {
        psychoJS.experiment.addData("regression_not_applied", 1);
        feat_lr = [[0.3], [0.4], [0.5], [0.6]];
        la_opt_in = [0, 0, 1, 1];
    } else {
        if ((util.sum(la_opt_in) === 0)) {
            psychoJS.experiment.addData("regression_not_applied", 1);
            feat_lr = [[0.3], [0.4], [0.5], [0.6]];
            la_opt_in = [0, 0, 1, 1];
        } else {
            psychoJS.experiment.addData("regression_not_applied", 0);
        }
    }
    
    
    
    numIterations = 120000;
    learningRate = 0.01;
    if ((trials_2.thisN === 0)) {
        weight = logisticRegression(feat_lr, la_opt_in, numIterations, learningRate);
        rat_indifferent=-weight[0]/weight[1];
        win_p=rat_indifferent+.2*(1-rat_indifferent);
        win_prob=Math.round((Math.round(win_p * 100) / 100) * 100);
    
    
       
    
    
        lose_prob=100-win_prob;
    //lose_prob=Math.round(lose_p * 100) / 100 ;
        psychoJS.experiment.addData("win_prob", win_prob);
        psychoJS.experiment.addData("lose_prob", lose_prob);
    
    
        
    }
    
    
    if (((win_prob > 100) || (win_prob < 0))) {
        psychoJS.experiment.addData("not_normal_reg", 1);
        win_prob = 20;
        lose_prob = 80;
    }
    if ((trials_2.thisN === 1)) {
        text_to_show = "What would you prefer?";
        answer_one = (((("Chance of OF WINNING: " + win_prob.toString()) + "%\nChance of LOSING:  ") + lose_prob.toString()) + "%\n\nStay Safe -Press A\nTake Gamble-Press B");
    } else {
        text_to_show = "What would you prefer?";
        answer_one = "a) Win 90 coins with a 20% chance and lose 60 coins with a 80% chace\n\n\n\nb) Keep your current number of coins";
    }
    test_q_6.alignHoriz = "left";
    answer.alignHoriz = "left";
    if ((trials_2.thisN === 1)) {
        varie_size = [0.8, 0.6];
        varie_position = [0, (- 0.3)];
        only_if_slide = 25;
    } else {
        varie_size = [1.71, 1.4];
        only_if_slide = 0;
        varie_position = [0, 0];
    }
    if ((trials_2.thisN === 1)) {
        if ((win_prob > 90)) {
            risk_slide = 11;
        } else {
            if ((win_prob > 80)) {
                risk_slide = 10;
            } else {
                if ((win_prob > 70)) {
                    risk_slide = 9;
                } else {
                    if ((win_prob > 60)) {
                        risk_slide = 8;
                    } else {
                        if ((win_prob > 50)) {
                            risk_slide = 7;
                        } else {
                            if ((win_prob > 40)) {
                                risk_slide = 6;
                            } else {
                                if ((win_prob > 30)) {
                                    risk_slide = 5;
                                } else {
                                    if ((win_prob > 20)) {
                                        risk_slide = 4;
                                    } else {
                                        if ((win_prob > 10)) {
                                            risk_slide = 3;
                                        } else {
                                            if ((win_prob > 0)) {
                                                risk_slide = 2;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        if ((trials_2.thisN === 0)) {
            risk_slide = 1;
        } else {
            risk_slide = (trials_2.thisN + 10);
        }
    }
    if ((trials_2.thisN < 2)) {
        skip_first = 0;
    } else {
        skip_first = 25;
    }
    
    test_q_6.setText('What would you prefer?');
    answer.setText(answer_one);
    image_9.setPos(varie_position);
    image_9.setSize(varie_size);
    image_9.setImage((("risk_distributions_final/Slide" + risk_slide.toString()) + ".jpeg"));
    console.log(("win prob " + win_prob.toString()));
    console.log(("weights" + weight.toString()));
    text_31.alignHoriz = "left";
    
    key_resp_16.keys = undefined;
    key_resp_16.rt = undefined;
    _key_resp_16_allKeys = [];
    // keep track of which components have finished
    risk_choices_2Components = [];
    risk_choices_2Components.push(test_q_6);
    risk_choices_2Components.push(answer);
    risk_choices_2Components.push(image_9);
    risk_choices_2Components.push(text_31);
    risk_choices_2Components.push(key_resp_16);
    
    risk_choices_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function risk_choices_2RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'risk_choices_2'-------
    // get current time
    t = risk_choices_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *test_q_6* updates
    if (t >= 0.0 && test_q_6.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      test_q_6.tStart = t;  // (not accounting for frame time here)
      test_q_6.frameNStart = frameN;  // exact frame index
      
      test_q_6.setAutoDraw(true);
    }

    frameRemains = 0.0 + 0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (test_q_6.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      test_q_6.setAutoDraw(false);
    }
    
    // *answer* updates
    if (t >= 0.0 && answer.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      answer.tStart = t;  // (not accounting for frame time here)
      answer.frameNStart = frameN;  // exact frame index
      
      answer.setAutoDraw(true);
    }

    frameRemains = 0.0 + only_if_slide - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (answer.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      answer.setAutoDraw(false);
    }
    
    // *image_9* updates
    if (t >= 0.0 && image_9.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      image_9.tStart = t;  // (not accounting for frame time here)
      image_9.frameNStart = frameN;  // exact frame index
      
      image_9.setAutoDraw(true);
    }

    frameRemains = 0.0 + 30 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (image_9.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      image_9.setAutoDraw(false);
    }
    
    // *text_31* updates
    if (t >= 0.0 && text_31.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_31.tStart = t;  // (not accounting for frame time here)
      text_31.frameNStart = frameN;  // exact frame index
      
      text_31.setAutoDraw(true);
    }

    frameRemains = 0.0 + skip_first - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_31.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_31.setAutoDraw(false);
    }
    
    // *key_resp_16* updates
    if (t >= 0.0 && key_resp_16.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_16.tStart = t;  // (not accounting for frame time here)
      key_resp_16.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_16.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_16.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_16.clearEvents(); });
    }

    frameRemains = 0.0 + 30 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (key_resp_16.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      key_resp_16.status = PsychoJS.Status.FINISHED;
  }

    if (key_resp_16.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_16.getKeys({keyList: ['a', 'b', 'y', 'n'], waitRelease: false});
      _key_resp_16_allKeys = _key_resp_16_allKeys.concat(theseKeys);
      if (_key_resp_16_allKeys.length > 0) {
        key_resp_16.keys = _key_resp_16_allKeys[_key_resp_16_allKeys.length - 1].name;  // just the last key pressed
        key_resp_16.rt = _key_resp_16_allKeys[_key_resp_16_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    risk_choices_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function risk_choices_2RoutineEnd() {
  return async function () {
    //------Ending Routine 'risk_choices_2'-------
    risk_choices_2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(key_resp_16.corr, level);
    }
    psychoJS.experiment.addData('key_resp_16.keys', key_resp_16.keys);
    if (typeof key_resp_16.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_16.rt', key_resp_16.rt);
        routineTimer.reset();
        }
    
    key_resp_16.stop();
    // the Routine "risk_choices_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var gamblingoutcomeComponents;
function gamblingoutcomeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'gamblingoutcome'-------
    t = 0;
    gamblingoutcomeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(2.000000);
    // update component parameters for each repeat
    if ((trials_2.thisN === 0)) {
        continueRoutine = false;
    }
    console.log(("response is: " + key_resp_16.keys));
    console.log(("opt in is registed as " + (key_resp_16.keys === "b").toString()));
    
    // keep track of which components have finished
    gamblingoutcomeComponents = [];
    gamblingoutcomeComponents.push(background_color_3);
    gamblingoutcomeComponents.push(traveling_one_2);
    gamblingoutcomeComponents.push(space_ship_2);
    
    gamblingoutcomeComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


var tes;
function gamblingoutcomeRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'gamblingoutcome'-------
    // get current time
    t = gamblingoutcomeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    if (((key_resp_16.keys === "b") || (key_resp_16.keys === "y"))) {
        continueRoutine = true;
        tes = (("Determining outcome in!: " + Math.round((3 - t), 1)) + "\n\n(outcomes revealed after all gambles)");
    } else {
        continueRoutine = true;
        tes = ("Generating next offer in: " + Math.round((3 - t), 1));
    }
    
    
    // *background_color_3* updates
    if (t >= 0.0 && background_color_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      background_color_3.tStart = t;  // (not accounting for frame time here)
      background_color_3.frameNStart = frameN;  // exact frame index
      
      background_color_3.setAutoDraw(true);
    }

    frameRemains = 0.0 + 2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (background_color_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      background_color_3.setAutoDraw(false);
    }
    
    // *traveling_one_2* updates
    if (t >= 0 && traveling_one_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      traveling_one_2.tStart = t;  // (not accounting for frame time here)
      traveling_one_2.frameNStart = frameN;  // exact frame index
      
      traveling_one_2.setAutoDraw(true);
    }

    frameRemains = 0 + 2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (traveling_one_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      traveling_one_2.setAutoDraw(false);
    }
    
    if (traveling_one_2.status === PsychoJS.Status.STARTED){ // only update if being drawn
      traveling_one_2.setText(tes, false);
    }
    
    // *space_ship_2* updates
    if (t >= 0.0 && space_ship_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      space_ship_2.tStart = t;  // (not accounting for frame time here)
      space_ship_2.frameNStart = frameN;  // exact frame index
      
      space_ship_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + 2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (space_ship_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      space_ship_2.setAutoDraw(false);
    }
    
    if (space_ship_2.status === PsychoJS.Status.STARTED){ // only update if being drawn
      space_ship_2.setImage('gamble.png', false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    gamblingoutcomeComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function gamblingoutcomeRoutineEnd() {
  return async function () {
    //------Ending Routine 'gamblingoutcome'-------
    gamblingoutcomeComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    if (((key_resp_16.keys === "b") || (key_resp_16.keys === "y"))) {
        psychoJS.experiment.addData("took_gamble", 1);
    } else {
        if (((key_resp_16.keys === "a") || (key_resp_16.keys === "n"))) {
            psychoJS.experiment.addData("took_gamble", 0);
        } else {
            psychoJS.experiment.addData("took_gamble", 16);
        }
    }
    
    return Scheduler.Event.NEXT;
  };
}


var last_total;
var _key_resp_20_allKeys;
var gamble_outcomeComponents;
function gamble_outcomeRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'gamble_outcome'-------
    t = 0;
    gamble_outcomeClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(5.000000);
    // update component parameters for each repeat
    if (((key_resp_16.keys === "b") || (key_resp_16.keys === "y"))) {
        if ((trials_2.thisN === 0)) {
            last_total = total_earned;
            r = util.randint(0, 100);
            if ((r < win_prob)) {
                psychoJS.experiment.addData("gambled_won", 1);
                total_earned = (total_earned + 90);
            } else {
                psychoJS.experiment.addData("gambled_won", 0);
                total_earned = (total_earned - 60);
            }
            continueRoutine = false;
        } else {
            if ((trials_2.thisN === 1)) {
                r = util.randint(0, 2);
                if ((r === 1)) {
                    total_earned = (total_earned + 90);
                    psychoJS.experiment.addData("gambled_won", 1);
                } else {
                    total_earned = (total_earned - 60);
                    psychoJS.experiment.addData("gambled_won", 0);
                }
                continueRoutine = false;
            } else {
                if ((trials_2.thisN === 2)) {
                    r = util.randint(0, 10);
                    if ((r > 5)) {
                        total_earned = (total_earned - 90);
                        psychoJS.experiment.addData("gambled_won", 1);
                    } else {
                        total_earned = (total_earned - 60);
                        psychoJS.experiment.addData("gambled_won", 0);
                    }
                    continueRoutine = false;
                } else {
                    if ((trials_2.thisN === 3)) {
                        r = util.randint(0, 100);
                        if ((r > 65)) {
                            total_earned += 90;
                            psychoJS.experiment.addData("gambled_won", 1);
                        } else {
                            total_earned -= 60;
                            psychoJS.experiment.addData("gambled_won", 0);
                        }
                        continueRoutine = false;
                    } else {
                        if ((trials_2.thisN === 4)) {
                            r = util.randint(0, 100);
                            if ((r > 70)) {
                                psychoJS.experiment.addData("gambled_won", 1);
                                total_earned = (total_earned + 90);
                            } else {
                                psychoJS.experiment.addData("gambled_won", 0);
                                total_earned = (total_earned - 60);
                            }
                            continueRoutine = false;
                        } else {
                            if ((trials_2.thisN === 5)) {
                                texts = (((("Your previous earnings were " + last_total.toString()) + "\nYour new earnings (after all gambles) is ") + total_earned.toString()) + "\n\nPress space to continue");
                            }
                        }
                    }
                }
            }
        }
    } else {
        console.log("we just always end up here");
        psychoJS.experiment.addData("gambled_won", null);
        if ((trials_2.thisN === 0)) {
            last_total = total_earned;
            continueRoutine = false;
        } else {
            if ((trials_2.thisN === 5)) {
                texts = (((("Your previous earnings were " + last_total.toString()) + "\nYour new earnings (after all gambles) is ") + total_earned.toString()) + "\n\nPress space to continue");
            } else {
                continueRoutine = false;
            }
        }
    }
    console.log(("total earned" + total_earned.toString()));
    
    text_27.setText(texts);
    key_resp_20.keys = undefined;
    key_resp_20.rt = undefined;
    _key_resp_20_allKeys = [];
    // keep track of which components have finished
    gamble_outcomeComponents = [];
    gamble_outcomeComponents.push(text_27);
    gamble_outcomeComponents.push(key_resp_20);
    
    gamble_outcomeComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function gamble_outcomeRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'gamble_outcome'-------
    // get current time
    t = gamble_outcomeClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_27* updates
    if (t >= 0.0 && text_27.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_27.tStart = t;  // (not accounting for frame time here)
      text_27.frameNStart = frameN;  // exact frame index
      
      text_27.setAutoDraw(true);
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_27.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_27.setAutoDraw(false);
    }
    
    // *key_resp_20* updates
    if (t >= 0.0 && key_resp_20.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_20.tStart = t;  // (not accounting for frame time here)
      key_resp_20.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_20.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_20.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_20.clearEvents(); });
    }

    frameRemains = 0.0 + 5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (key_resp_20.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      key_resp_20.status = PsychoJS.Status.FINISHED;
  }

    if (key_resp_20.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_20.getKeys({keyList: ['space'], waitRelease: false});
      _key_resp_20_allKeys = _key_resp_20_allKeys.concat(theseKeys);
      if (_key_resp_20_allKeys.length > 0) {
        key_resp_20.keys = _key_resp_20_allKeys[_key_resp_20_allKeys.length - 1].name;  // just the last key pressed
        key_resp_20.rt = _key_resp_20_allKeys[_key_resp_20_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    gamble_outcomeComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function gamble_outcomeRoutineEnd() {
  return async function () {
    //------Ending Routine 'gamble_outcome'-------
    gamble_outcomeComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData("total_earned", total_earned);
    
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(key_resp_20.corr, level);
    }
    psychoJS.experiment.addData('key_resp_20.keys', key_resp_20.keys);
    if (typeof key_resp_20.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_20.rt', key_resp_20.rt);
        routineTimer.reset();
        }
    
    key_resp_20.stop();
    return Scheduler.Event.NEXT;
  };
}


var open_questions_2Components;
function open_questions_2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'open_questions_2'-------
    t = 0;
    open_questions_2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    text_to = "Do you have any questions or feedback about any parts of the game?\n\n Response should be at least 2 sentences.\n\n";
    document.body.style.cursor = "auto";
    psychoJS.experiment.addData("label", la_opt_in);
    psychoJS.experiment.addData("control", feat_lr);
    
    textbox_2.setText('');
    textbox_2.refresh();
    textbox_2.setText('Enter text here\n');
    // setup some python lists for storing info about the mouse_2
    mouse_2.clicked_name = [];
    gotValidClick = false; // until a click is received
    text_19.setText(text_to);
    please_write_more.alignHoriz = "left";
    if ((need_feedback.thisN === 0)) {
        time_to_show = 0;
    } else {
        if ((need_feedback.thisN > 0)) {
            time_to_show = 100000;
        }
    }
    
    // keep track of which components have finished
    open_questions_2Components = [];
    open_questions_2Components.push(textbox_2);
    open_questions_2Components.push(text_18);
    open_questions_2Components.push(mouse_2);
    open_questions_2Components.push(text_19);
    open_questions_2Components.push(please_write_more_2);
    
    open_questions_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function open_questions_2RoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'open_questions_2'-------
    // get current time
    t = open_questions_2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *textbox_2* updates
    if (t >= 0.0 && textbox_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      textbox_2.tStart = t;  // (not accounting for frame time here)
      textbox_2.frameNStart = frameN;  // exact frame index
      
      textbox_2.setAutoDraw(true);
    }

    
    // *text_18* updates
    if (t >= 0.0 && text_18.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_18.tStart = t;  // (not accounting for frame time here)
      text_18.frameNStart = frameN;  // exact frame index
      
      text_18.setAutoDraw(true);
    }

    // *mouse_2* updates
    if (t >= 0.0 && mouse_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_2.tStart = t;  // (not accounting for frame time here)
      mouse_2.frameNStart = frameN;  // exact frame index
      
      mouse_2.status = PsychoJS.Status.STARTED;
      mouse_2.mouseClock.reset();
      prevButtonState = mouse_2.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_2.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_2.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [text_7]) {
            if (obj.contains(mouse_2)) {
              gotValidClick = true;
              mouse_2.clicked_name.push(obj.name)
            }
          }
          if (gotValidClick === true) { // abort routine on response
            continueRoutine = false;
          }
        }
      }
    }
    
    // *text_19* updates
    if (t >= 0.0 && text_19.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_19.tStart = t;  // (not accounting for frame time here)
      text_19.frameNStart = frameN;  // exact frame index
      
      text_19.setAutoDraw(true);
    }

    
    // *please_write_more_2* updates
    if (t >= 0.0 && please_write_more_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      please_write_more_2.tStart = t;  // (not accounting for frame time here)
      please_write_more_2.frameNStart = frameN;  // exact frame index
      
      please_write_more_2.setAutoDraw(true);
    }

    frameRemains = 0.0 + time_to_show - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (please_write_more_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      please_write_more_2.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    open_questions_2Components.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function open_questions_2RoutineEnd() {
  return async function () {
    //------Ending Routine 'open_questions_2'-------
    open_questions_2Components.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    psychoJS.experiment.addData('textbox_2.text',textbox_2.text)
    // store data for psychoJS.experiment (ExperimentHandler)
    _mouseXYs = mouse_2.getPos();
    _mouseButtons = mouse_2.getPressed();
    psychoJS.experiment.addData('mouse_2.x', _mouseXYs[0]);
    psychoJS.experiment.addData('mouse_2.y', _mouseXYs[1]);
    psychoJS.experiment.addData('mouse_2.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('mouse_2.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('mouse_2.rightButton', _mouseButtons[2]);
    if (mouse_2.clicked_name.length > 0) {
      psychoJS.experiment.addData('mouse_2.clicked_name', mouse_2.clicked_name[0]);}
    if ((textbox_2.text.length > 30)) {
        need_feedback.finished = true;
    }
    
    // the Routine "open_questions_2" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _key_resp_7_allKeys;
var end_experimentComponents;
function end_experimentRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'end_experiment'-------
    t = 0;
    end_experimentClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    text_13.alignHoriz = "left";
    
    var today= new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    console.log(today); //Ouput: "11:31"console.log(today); //Ouput: "11:31:41"
    psychoJS.experiment.addData("experiment_ended", today);
    
    
    key_resp_7.keys = undefined;
    key_resp_7.rt = undefined;
    _key_resp_7_allKeys = [];
    // keep track of which components have finished
    end_experimentComponents = [];
    end_experimentComponents.push(text_13);
    end_experimentComponents.push(key_resp_7);
    
    end_experimentComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
       });
    return Scheduler.Event.NEXT;
  }
}


function end_experimentRoutineEachFrame() {
  return async function () {
    //------Loop for each frame of Routine 'end_experiment'-------
    // get current time
    t = end_experimentClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_13* updates
    if (t >= 0.0 && text_13.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_13.tStart = t;  // (not accounting for frame time here)
      text_13.frameNStart = frameN;  // exact frame index
      
      text_13.setAutoDraw(true);
    }

    frameRemains = 0.0 + 20 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text_13.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_13.setAutoDraw(false);
    }
    
    // *key_resp_7* updates
    if (t >= 0.0 && key_resp_7.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_7.tStart = t;  // (not accounting for frame time here)
      key_resp_7.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_7.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_7.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_7.clearEvents(); });
    }

    if (key_resp_7.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_7.getKeys({keyList: ['space'], waitRelease: false});
      _key_resp_7_allKeys = _key_resp_7_allKeys.concat(theseKeys);
      if (_key_resp_7_allKeys.length > 0) {
        key_resp_7.keys = _key_resp_7_allKeys[_key_resp_7_allKeys.length - 1].name;  // just the last key pressed
        key_resp_7.rt = _key_resp_7_allKeys[_key_resp_7_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    end_experimentComponents.forEach( function(thisComponent) {
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
      }
    });
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function end_experimentRoutineEnd() {
  return async function () {
    //------Ending Routine 'end_experiment'-------
    end_experimentComponents.forEach( function(thisComponent) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    });
    //console.log('transfer should occur'); 
    //psychoJS.setRedirectUrls("https://hujipsych.au1.qualtrics.com/jfe/form/SV_da1EsAzG9JHmeq2?id="+expInfo['participant']);
    //psychoJS.quit({message: 'Taking you to the completion code'});
    // update the trial handler
    if (psychoJS.experiment.currentLoop instanceof MultiStairHandler) {
      psychoJS.experiment.currentLoop.addResponse(key_resp_7.corr, level);
    }
    psychoJS.experiment.addData('key_resp_7.keys', key_resp_7.keys);
    if (typeof key_resp_7.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_7.rt', key_resp_7.rt);
        routineTimer.reset();
        }
    
    key_resp_7.stop();
    // the Routine "end_experiment" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


function endLoopIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        const thisTrial = snapshot.getCurrentTrial();
        if (typeof thisTrial === 'undefined' || !('isTrials' in thisTrial) || thisTrial.isTrials) {
          psychoJS.experiment.nextEntry(snapshot);
        }
      }
    return Scheduler.Event.NEXT;
    }
  };
}


function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
