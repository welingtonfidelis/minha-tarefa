import React from "react";

export interface Props {
    title?: string;
    description: string | React.ReactElement;
    isLoading?: boolean;
    onConfirmText?: string;
    onCancelText?: string;

    onConfirm?: () => void;
}