import React from 'react';
import {create} from 'react-test-renderer';
import ProfileStatus from '../components/Content/Profile/ProfileInfo/ProfileStatus';

describe('ProfileStatus  component', () => {
    test('status from props should be in the state', () => {
        const component = create(<ProfileStatus userStatus='ideas-network'/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('ideas-network');
    });

    test('after creation <span> should be displayed', () => {
        const component = create(<ProfileStatus userStatus='ideas-network'/>);
        const root = component.root;
        let span = root.findByType('span');
        expect(span).not.toBeNull();
    });

    test('after creation <input> shouldn\'t be displayed', () => {
        const component = create(<ProfileStatus userStatus='ideas-network'/>);
        const root = component.root;
        expect(() => {
            let input = root.findByType('input');
        }).toThrow();
    });

    test('after creation <span> should contains correct status', () => {
        const component = create(<ProfileStatus userStatus='ideas-network'/>);
        const root = component.root;
        let span = root.findByType('span');
        expect(span.children[1]).toBe('ideas-network');
    });

    test('input should be displayed in edit mode instead of span', () => {
        const component = create(<ProfileStatus userStatus='ideas-network'/>);
        const root = component.root;
        let span = root.findByType('span');
        span.props.onDoubleClick();
        let input = root.findByType('input');
        expect(input.props.value).toBe('ideas-network');
    });

    test('callback should be called', () => {
        const mockCallBack = jest.fn();
        const component = create(<ProfileStatus userStatus='ideas-network' updateStatus={mockCallBack}/>);
        const instance = component.getInstance();
        instance.disableEditMode();
        expect(mockCallBack.mock.calls.length).toBe(1);
    });
});
