import { useLinkClickHandler } from 'react-router-dom';

function EditRoutines() {
  return;
}

export default EditRoutines;

// outline:

// list of routines by name
// first idea:
//     clicked routine "drops down", autofills inputs from NewRoutine.
//     If you do that, how to differentiate routineID without having it
//     in the form? save clicked routine to state? probably, directly, not
//     through MyContext.

// notes:

// fetch for list of routines probably happens in MyContext
// allow all programs to be edited? If not, how protect originals?
//     - is there a downside to only fetching routines with index > last original routine index?
//     - could write backend protection to throw error if attempt to edit, but feels unnecessary.
