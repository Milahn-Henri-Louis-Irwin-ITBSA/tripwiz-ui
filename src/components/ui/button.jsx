import { cn } from '../utils';
export default function Button({ className, ...props }) {
  return (
    <button className={cn('bg-red-700', className)} {...props}>
      {props.text}
    </button>
  );
}
