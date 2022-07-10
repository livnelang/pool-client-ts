import { describe, expect, it, test } from "vitest";
import renderer from 'react-test-renderer';
import AppButton from "./AppButton";

function toJson(component: renderer.ReactTestRenderer) {
    const result = component.toJSON()
    expect(result).toBeDefined()
    expect(result).not.toBeInstanceOf(Array)
    return result as renderer.ReactTestRendererJSON
  }
  
  test('Link changes the class when hovered', () => {
    const component = renderer.create(

      <AppButton text="Button Test"/>
    )
    let tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })