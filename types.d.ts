import { HTMLMotionProps } from 'framer-motion';

declare module 'framer-motion' {
  export interface motion {
    div: React.ForwardRefExoticComponent<
      HTMLMotionProps<'div'> & React.RefAttributes<HTMLDivElement>
    >;
    span: React.ForwardRefExoticComponent<
      HTMLMotionProps<'span'> & React.RefAttributes<HTMLSpanElement>
    >;
    // Add other elements as needed
  }
} 