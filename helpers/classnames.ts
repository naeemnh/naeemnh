type TClassNames = (string | boolean | null | undefined)[];

export default function classnames(arr: TClassNames): string {
  return arr.reduce((str, cn) => {
    if (typeof cn === "string")
      return str = `${str} ${cn}`;
    return str;
  }) as string;
}