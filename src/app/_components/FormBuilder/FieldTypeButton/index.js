import React from 'react';
import { useTranslation } from "@/hooks/useTranslation";
import Icon from '@/icons/Icon';
import Button from '@/components/ui/Button';

export const FieldTypeButton = ({ type, onClick }) => {

    const {t} = useTranslation()

   return (
        <Button
            onClick={() => onClick(type.id)}
            className="text-left flex items-center gap-2.5 transition-all duration-150 active:scale-[0.98]"
            icon={<Icon name={type.icon} className="w-4 h-4" />}
        >
            <span className="font-medium">{t(type.label)}</span>
        </Button>
    )
};