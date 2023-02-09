declare module './CustomSetCard' {
    export interface CustomSetCardProps {
      liftName: string;
      index: string;
      position: string;
      weight: string;
      reps: string;
      amrap: boolean;
      selected: boolean;
    }
    const CustomSetCard: React.FC<CustomSetCardProps>;
    export default CustomSetCard;
  }