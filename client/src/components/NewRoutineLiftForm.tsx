import React from 'react'
import {
  TextField,
  Typography,
  Checkbox,
  Button,
  Autocomplete,
} from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { MyConsumer, MyContext } from './MyContext';
import { useParams } from 'react-router-dom';
import CustomSetCard from './CustomSetCard';
import userRoutineLift from '../types/userRoutineLift';
import lift from '../types/lift';

function NewRoutineLiftForm() {
  const [lift_name, setLift_name] = useState<string>('');
  const [index, setIndex] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [weight, setWeight] = useState<string>('1');
  const [reps, setReps] = useState<string>('');
  const [amrap, setAmrap] = useState(false);
  const [indexInfo, setIndexInfo] = useState<boolean>(false);
  const [positionInfo, setPositionInfo] = useState<boolean>(false);
  const [weightInfo, setWeightInfo] = useState<boolean>(false);
  const [repsInfo, setRepsInfo] = useState<boolean>(false);
  const [amrapInfo, setAmrapInfo] = useState<boolean>(false);
  const [allSets, setAllSets] = useState<userRoutineLift[]>([]);
  const [selected, setSelected] = useState<string>('');
  const { lift_names } = useContext<any>(MyContext);
  const params = useParams();

  useEffect(() => {
    fetch(`/all_routine_lifts/${params.id}`)
      .then((res) => res.json())
      .then((data) => setAllSets(data));
  }, [params.id]);

  function onSaveSet() {
    fetch('/routine_lifts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        routineId: params.id,
        lift_name,
        index,
        position,
        weight,
        reps,
        amrap,
      }),
    })
      .then((res) => res.json())
      .then((data) => setAllSets([...allSets, data]));
  }

  function onDeleteSet(id: string) {
    fetch(`/routine_lifts/${id}`, {
      method: 'DELETE',
    }).then(() => setAllSets(allSets.filter((set) => set.id !== id)));
  }

  return (
    <MyConsumer>
      {(context: any) => (
        <div className="col">
          <div className="row">
            {allSets.map((set) => (
              <div className="col" key={set.id}>
                <CustomSetCard
                  selected={selected === set.id}
                  lift_name={
                    lift_names.filter((lift: lift) => lift.id === set.lift_id)[0].name
                  }
                  index={set.index}
                  position={set.position}
                  weight={set.weight}
                  reps={set.reps}
                  amrap={set.amrap}
                />
                <div className="row">
                  <Button
                    onClick={() => {
                      setIndex(set.index);
                      setPosition(set.position);
                      setWeight(set.weight);
                      setReps(set.reps);
                      setAmrap(set.amrap);
                      setSelected(set.id);
                    }}
                  >
                    edit
                  </Button>
                  <Button onClick={() => onDeleteSet(set.id)}>delete</Button>
                </div>
              </div>
            ))}
          </div>
          <Button>Add lift</Button>
          <Autocomplete
            sx={{ maxWidth: 275 }}
            getOptionLabel={(option: any) => option.name}
            options={context.lifts}
            inputValue={lift_name}
            onInputChange={(e, val) => setLift_name(val)}
            renderInput={(params) => <TextField {...params} />}
          />
          <div className="row">
            <TextField
              sx={{ width: '100px' }}
              value={index}
              label="index"
              onChange={(e) => setIndex(e.target.value)}
            />
            <Button onClick={() => setIndexInfo((indexInfo) => !indexInfo)}>
              What's this?
            </Button>
            {indexInfo && (
              <Typography>
                The index correlates with which day of the program you perform
                the lift. Eg. if you have three distinct lift days in your
                program, you would use "1" for each lift done on the first day
                of the program, "2" for the second day, etc. Note: you will need
                as many days of the program (as many indices) as there are
                workouts before you raise the weight.
              </Typography>
            )}
          </div>
          <div className="row">
            <TextField
              sx={{ width: '100px' }}
              value={position}
              label="position"
              onChange={(e) => setPosition(e.target.value)}
            />
            <Button
              onClick={() => setPositionInfo((positionInfo) => !positionInfo)}
            >
              What's this?
            </Button>
            {positionInfo && (
              <Typography>
                The position is for the order of lifts on a given day. Eg some
                programs prefer to do arm workouts before leg workouts. The
                position assures that the lifts are in the correct order on each
                day.
              </Typography>
            )}
          </div>
          <div className="row">
            <TextField
              sx={{ width: '100px' }}
              value={weight}
              label={'% of max'}
              onChange={(e) => setWeight(e.target.value)}
            />
            <Button onClick={() => setWeightInfo((weightInfo) => !weightInfo)}>
              What's this?
            </Button>
            {weightInfo && (
              <Typography>
                If your routine uses the same weights for every lift until you
                go up in weight, leave this at "1". If your routine uses some
                percentage of a max, enter the percentage as a decimal, eg. for
                75% of your max, type ".75".
              </Typography>
            )}
          </div>
          <div className="row">
            <TextField
              sx={{ width: '100px' }}
              value={reps}
              label="reps"
              onChange={(e) => setReps(e.target.value)}
            />
            <Button onClick={() => setRepsInfo((repsInfo) => !repsInfo)}>
              What's this?
            </Button>
            {repsInfo && (
              <Typography>
                You need to make a new lift for each set of the workout. eg if
                you do 3x5 bench press, you need to make three Lifts, each with
                5 reps.
              </Typography>
            )}
          </div>
          <div className="row">
            <Checkbox onChange={(e) => setAmrap((amrap) => (amrap = !amrap))} />
            <Typography>AMRAP?</Typography>
            <Button onClick={() => setAmrapInfo((amrapInfo) => !amrapInfo)}>
              What's this?
            </Button>
            {amrapInfo && (
              <Typography>
                If your routine requires you to only perform the exact number of
                reps specified, leave this unchecked. If your routine allows to
                do more if you're able, check the box. This will show up as a
                "+" after the rep count.
              </Typography>
            )}
          </div>
          <Button
            sx={{ width: '100px' }}
            variant="contained"
            onClick={() => onSaveSet()}
          >
            Save
          </Button>
        </div>
      )}
    </MyConsumer>
  );
}
export default NewRoutineLiftForm;

// TODO:
// Move all descriptions to NewRoutine -- or get rid of newroutine?

// notes:

// could eventually drag and drop for order, rather than use index
// could have a hover for explanation rather than always have descriptions
