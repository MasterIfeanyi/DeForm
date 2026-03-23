import React from 'react'
import Icon from '@/icons/Icon'

export default function StatCard({
  title,
  value,
  icon,
  subtitle,
  position = 'right', // right | bottom
  textColor = 'text-foreground',
}) {
  return (
    <div className="rounded-xl p-5 border border-border bg-card shadow-[0_2px_8px_rgba(0,0,0,0.08)]">

      <div
        className={`flex ${
          position === 'bottom'
            ? 'flex-col items-start gap-3'
            : 'items-center justify-between'
        }`}
      >
        {/* Left content */}
        <div>
          <h3 className={`text-sm text-muted-foreground`}>
            {title}
          </h3>

          <p className={`text-xl font-medium mt-1 ${textColor}`}>
            {value}
          </p>
        </div>

        {/* Right / Bottom content */}
        {icon && position !== 'bottom' && (
          <div className="text-muted-foreground flex items-center justify-center">
            {typeof icon === 'string' ? (
              <Icon name={icon} className="w-5 h-5" />
            ) : (
              icon
            )}
          </div>
        )}

        {/* Bottom mode (icon + subtitle grouped) */}
        {position === 'bottom' && (
          <div className="flex items-center gap-2 text-muted-foreground">
            {icon && (
              typeof icon === 'string' ? (
                <Icon name={icon} className="w-4 h-4" />
              ) : icon
            )}
            {subtitle && (
              <span className="text-xs">{subtitle}</span>
            )}
          </div>
        )}
      </div>

      {/* Optional subtitle for right layout */}
      {subtitle && position !== 'bottom' && (
        <p className="text-xs text-muted-foreground mt-2">
          {subtitle}
        </p>
      )}
    </div>
  )
}