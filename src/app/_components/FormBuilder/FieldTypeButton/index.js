import React from 'react';
import { useTranslation } from "@/hooks/useTranslation";
import Icon from '@/icons/Icon';


export const FieldTypeButton = ({ type, onClick }) => {

    const {t} = useTranslation()

   return (
        <button
            onClick={() => onClick(type.id)}
            className="w-full px-3 py-2.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-neutral-600 rounded-lg text-left flex items-center gap-2.5 text-sm transition-all duration-150 active:scale-[0.98]"
        >
            <Icon name={type.icon} className="w-4 h-4" />
            <span className="font-medium">{t(type.label)}</span>
        </button>
    )
};