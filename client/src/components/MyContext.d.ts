import React from "react";

export const user: {id: number, username: string, password_digest: string, routine_id: number, routine_position: number};
export const lifts: {id: number, name: string};
export const liftNames: {id: number, name: string};
export function onLogout(): null;
export function onLogin(e: React.SyntheticEvent, name: string, password: string): null;
export const loginFailed: bool;
export const workouts: {id: number, user_id: number, date: Date};
export function addLift(e: React.SyntheticEvent, liftName: string): null;
export function getLifts(): null;
export function setRoutine(routine_id: number): null;
export const todaysLifts: {id: number, routine_id: number, weight: number, reps: number, lift_id: number, position: number, index: number, amrap: bool}[];
export const routineLifts: {}[];
export function finishRoutineWorkout(): null;
export function onLogSet(liftName: string, weight: number, reps: number): null;
export const currentWorkout: {id: number, lift_id: number, workout_id: number, weight: number, reps: number}[];
export const maxes: {id: number, lift_id: number, lift_max: number, goal: number}[];
export function onSaveStartingWeight(liftName: number, startingWeight: number): null;
export const deloads: number[];
export const increases: number[];
export const liftNameError: string;
export const userLiftError: string;
export const MyContext: any
export const MyConsumer: any
export const MyProvider: any