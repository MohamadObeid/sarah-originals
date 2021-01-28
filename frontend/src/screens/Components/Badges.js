/////////////////////// Badges ///////////////////////
import React from 'react'

export const Badges = React.memo(({ slide, timer, styles }) => {
    const { badges, badgesWrap, badgeWrap, badgeStyle, backgroundColors } = styles

    var slash, upcoming, backgroundColor
    var disc = (slide.discount && slide.discount !== 0 &&
        [{ type: 'discount', discount: slide.discount + '%' }]) || []

    if (!timer.ended && slide.onSale.amount >= slide.discount) {
        disc.push({ type: 'onSale', discount: slide.onSale.amount + '%' })
        if (timer.active) slash = true
        else {
            upcoming = true
            backgroundColor = '#cccccc'
        }
    }

    const badgeList = [...badges, ...disc]

    return (
        <div className='badges-wrap' style={badgesWrap}>
            {badgeList && badgeList.map((badge, index) =>
                <div className='badge-wrap' key={index}
                    style={{
                        ...badgeWrap,
                        backgroundColor: badge.type === 'onSale' && backgroundColor
                            ? backgroundColor
                            : backgroundColors[index]
                    }}>
                    {badge.type === 'discount' && slash && <div className='slash-over slash' />}
                    {badge.type === 'onSale' && upcoming && <div className='upcoming-badget'>coming soon</div>}
                    <div style={badgeStyle}>{badge.discount || badge}</div>
                </div>
            )}
        </div>
    )
})