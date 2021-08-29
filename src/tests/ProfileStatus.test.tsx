import React from 'react';
import {create} from 'react-test-renderer';
import ProfileStatus from '../components/Content/Profile/ProfileInfo/ProfileStatus';

describe('ProfileStatus  component', () => {
    test('status from props should be in the state', () => {
        const mockCallBack = jest.fn();
        const component = create(<ProfileStatus status='ideas-network' updateStatus={mockCallBack}/>);
        const instance = component.getInstance();
        expect(instance?.props.status).toBe('ideas-network');
    });

    test('after creation <span> should be displayed', () => {
        const mockCallBack = jest.fn();
        const component = create(<ProfileStatus status='ideas-network' updateStatus={mockCallBack}/>);
        const root = component.root;
        const span = root.findByType('span');
        expect(span).not.toBeNull();
    });

    test('after creation <input> shouldn\'t be displayed', () => {
        const mockCallBack = jest.fn();
        const component = create(<ProfileStatus status='ideas-network' updateStatus={mockCallBack}/>);
        const root = component.root;
        expect(() => {
            const input = root.findByType('input');
        }).toThrow();
    });

    test('after creation <span> should contains correct status', () => {
        const mockCallBack = jest.fn();
        const component = create(<ProfileStatus status='ideas-network' updateStatus={mockCallBack}/>);
        const root = component.root;
        const span = root.findByType('span');
        expect(span.children[1]).toBe('ideas-network');
    });

    test('input should be displayed in edit mode instead of span', () => {
        const mockCallBack = jest.fn();
        const component = create(<ProfileStatus status='ideas-network' updateStatus={mockCallBack}/>);
        const root = component.root;
        const span = root.findByType('span');
        span.props.onDoubleClick();
        const input = root.findByType('input');
        expect(input.props.value).toBe('ideas-network');
    });

    test('callback should be called', () => {
        const mockCallBack = jest.fn();
        const component = create(<ProfileStatus status='ideas-network' updateStatus={mockCallBack}/>);
        const instance = component.getInstance();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        instance?.disableEditMode();
        expect(mockCallBack.mock.calls.length).toBe(1);
    });
});
