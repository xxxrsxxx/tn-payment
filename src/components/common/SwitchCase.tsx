import { JSX } from 'react';

interface SwitchCaseProps<RenderKey extends string | number> {
  renderKey: RenderKey;
  cases: Record<RenderKey, JSX.Element>;
  defaultComponent?: JSX.Element;
}

/**
 * @param renderKey render가 될 key값
 * @param cases key값 별 render case
 * @param defaultComponent default로 render될 component
 */
const SwitchCase = <RenderKey extends string | number>({
  renderKey,
  cases,
  defaultComponent = <></>,
}: SwitchCaseProps<RenderKey>) => cases[renderKey] || defaultComponent;

export default SwitchCase;
