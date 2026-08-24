const STEPS = ['Location', 'Market', 'Meal Plan', 'Your List'];

export default function StepIndicator({ step }: { step: number }) {
  return (
    <ol className="flex items-center justify-center gap-2 sm:gap-4 mb-8">
      {STEPS.map((label, i) => {
        const idx = i + 1;
        const active = idx === step;
        const done = idx < step;
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              className={
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold ' +
                (active
                  ? 'bg-green-600 text-white'
                  : done
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : 'bg-stone-200 text-stone-500 dark:bg-stone-800 dark:text-stone-500')
              }
            >
              {done ? '✓' : idx}
            </span>
            <span
              className={
                'hidden sm:inline text-sm font-medium ' +
                (active ? 'text-stone-900 dark:text-stone-100' : 'text-stone-400 dark:text-stone-600')
              }
            >
              {label}
            </span>
            {idx < STEPS.length && <span className="w-4 sm:w-8 h-px bg-stone-300 dark:bg-stone-700" />}
          </li>
        );
      })}
    </ol>
  );
}
