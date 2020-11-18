import {
    trigger, style, query, animateChild, group, transition, animate
} from '@angular/animations'
export const slideInAnimation =
    trigger('routeAnimations', [
        transition('CategoryDetails => SeeAll', slideTo('right')),
        transition('SeeAll => CategoryDetails', slideTo('left')),
        transition('CategoryDetails => Category', slideTo('left')),
        transition('Category => CategoryDetails', slideTo('right')),
        // transition('Search => MobileSearch', slideTo('right')),
        // transition('MobileSearch => Search', slideTo('left')),
        // transition('Cart => CartNext', slideTo('right')),
        // transition('CartNext => Cart', slideTo('left')),
        // transition('CartNext => Last', slideTo('right')),
        // transition('Last => CartNext', slideTo('left')),
        // transition('Last => Category', slideTo('left')),
        // transition('* => Login', slideTo('top')),
        // transition('* => Signup', slideTo('top')),
        // transition('Home => Category', slideTo('right')),
        // transition('Category => Home', slideTo('left')),
        // transition('* => Prehome', slideTo('top'))
    ])

function slideTo(direction) {
    const optional = {optional: true}
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                [direction]: 0,
                width: '100%',
            })
        ], optional),
        query(':enter', [
            style({ [direction]: '-100%',
})
        ]),
        group([
            query(':leave', [
                animate('200ms ease', style({ [direction]: '100%',
        }))
            ], optional),
            query(':enter', [
                animate('200ms ease', style({ [direction]: '0',
        }))
            ])
        ])
    ]
}

export function fadeIn(){
    return [
        transition(':enter', [
            style({opacity: 0}),
            animate('200ms ease-in', style({opacity: 1}))
          ])
      ];
}
 