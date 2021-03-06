import * as React from 'react';
import { Activity, Attachment, AttachmentLayout } from './BotConnection';
import { AttachmentView } from './Attachment';
import { Carousel } from './Carousel';
import { FormattedText } from './FormattedText';
import { FormatState } from './Store';

const Attachments = (props: {
    attachments: Attachment[],
    attachmentLayout: AttachmentLayout,
    measureParentHorizontalOverflow?: () => number,
    format: FormatState,
    onClickButton: (type: string, value: string) => void,
    onImageLoad: () => void
}) => {
    const { attachments, attachmentLayout, ... otherProps } = props;
    if (!attachments || attachments.length == 0)
        return null;
    return attachmentLayout === 'carousel' ?
        <Carousel
            attachments={ attachments }
            { ... otherProps }
        />
    : 
        <div className="wc-list">
            { attachments.map((attachment, index) =>
                <AttachmentView
                    key={ index }
                    attachment={ attachment }
                    { ... otherProps }
                />
            ) }
        </div>
}

interface Props {
    format: FormatState,
    activity: Activity,
    measureParentHorizontalOverflow?: () => number,
    onClickButton: (type: string, value: string) => void,
    onImageLoad: () => void
}

export class ActivityView extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props)
    }

    shouldComponentUpdate(nextProps: Props) {
        return this.props.activity !== nextProps.activity || this.props.format !== nextProps.format;
    }

    render() {
        const { activity, ... otherProps } = this.props;
        switch (activity.type) {
            case 'message':
                return (
                    <div>
                        <FormattedText
                            text={ activity.text }
                            format={ activity.textFormat }
                            onImageLoad={ otherProps.onImageLoad }
                        />
                        <Attachments
                            attachments={ activity.attachments }
                            attachmentLayout={ activity.attachmentLayout }
                            { ... otherProps }
                        />
                    </div>
                );

            case 'typing':
                return <div>TYPING</div>;
        }
    }
}