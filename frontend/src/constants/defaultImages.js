/*import img01 from '../../images/sample-1.jpg';
import img02 from '../../images/sample-2.jpg';
import img03 from '../../images/sample-3.jpg';
import img1 from '../../images/category-sample-1.jpg';
import img2 from '../../images/category-sample-2.jpg';
import img3 from '../../images/category-sample-3.jpg';
import img4 from '../../images/category-sample-4.jpg';
import img5 from '../../images/category-sample-5.jpg';
import img6 from '../../images/category-sample-6.png';
import img7 from '../../images/category-sample-7.jpg';
import img8 from '../../images/category-sample-8.jpg';
import img9 from '../../images/category-sample-9.png';
import img10 from '../../images/category-sample-10.png';
import img11 from '../../images/category-sample-11.png';
import img12 from '../../images/banner-sample-1.jpg';
import img13 from '../../images/banner-sample-2.jpg';
import img14 from '../../images/banner-sample-3.jpg';
import img15 from '../../images/banner-sample-4.jpg';
import img16 from '../../images/banner-sample-5.jpg';*/
import img01 from '../images/sample-1.jpg';
import img02 from '../images/sample-2.jpg';
import img03 from '../images/sample-3.jpg';
import img1 from '../images/category-sample-1.jpg';
import img2 from '../images/category-sample-2.jpg';
import img3 from '../images/category-sample-3.jpg';
import img4 from '../images/category-sample-4.jpg';
import img5 from '../images/category-sample-5.jpg';
import img6 from '../images/category-sample-6.png';
import img7 from '../images/category-sample-7.jpg';
import img8 from '../images/category-sample-8.jpg';
import img9 from '../images/category-sample-9.png';
import img10 from '../images/category-sample-10.png';
import img11 from '../images/category-sample-11.png';
import img12 from '../images/banner-sample-1.jpg';
import img13 from '../images/banner-sample-2.jpg';
import img14 from '../images/banner-sample-3.jpg';
import img15 from '../images/banner-sample-4.jpg';
import img16 from '../images/banner-sample-5.jpg';
import img17 from '../images/banner-sample-6.jpg';
import img18 from '../images/banner-sample-7.jpg';
import img19 from '../images/banner-sample-8.jpg';
import img20 from '../images/banner-sample-9.jpg';
import img21 from '../images/banner-sample-10.jpg';
import img22 from '../images/banner-sample-11.jpg';
import img23 from '../images/stunning.png'
import img24 from '../images/sub-banner-1.jpg';
import img25 from '../images/sub-banner-2.jpg';
import img26 from '../images/sub-banner-3.jpg';
import img27 from '../images/sub-banner-4.jpg';
import { domain } from '../methods/methods';
const imageUrl = domain ? domain : window.location.origin + '/api/uploads/image/'

export const url = (src) => {
    if (!src.includes('images')) return imageUrl + src
    return (
        src === '../../images/sample-1.jpg'
            ? img01
            : src === '../../images/sample-2.jpg'
                ? img02
                : src === '../../images/sample-3.jpg'
                    ? img03
                    : src === '../../images/category-sample-1.jpg'
                        ? img1
                        : src === '../../images/category-sample-2.jpg'
                            ? img2
                            : src === '../../images/category-sample-3.jpg'
                                ? img3
                                : src === '../../images/category-sample-4.jpg'
                                    ? img4
                                    : src === '../../images/category-sample-5.jpg'
                                        ? img5
                                        : src === '../../images/category-sample-6.png'
                                            ? img6
                                            : src === '../../images/category-sample-7.jpg'
                                                ? img7
                                                : src === '../../images/category-sample-8.jpg'
                                                    ? img8
                                                    : src === '../../images/category-sample-9.png'
                                                        ? img9
                                                        : src === '../../images/category-sample-10.png'
                                                            ? img10
                                                            : src === '../../images/category-sample-11.png'
                                                                ? img11
                                                                : src === '../../images/banner-sample-1.jpg'
                                                                    ? img12
                                                                    : src === '../../images/banner-sample-2.jpg'
                                                                        ? img13
                                                                        : src === '../../images/banner-sample-3.jpg'
                                                                            ? img14
                                                                            : src === '../../images/banner-sample-4.jpg'
                                                                                ? img15
                                                                                : src === '../../images/banner-sample-5.jpg'
                                                                                    ? img16
                                                                                    : src === '../../images/banner-sample-6.jpg'
                                                                                        ? img17
                                                                                        : src === '../../images/banner-sample-7.jpg'
                                                                                            ? img18
                                                                                            : src === '../../images/banner-sample-8.jpg'
                                                                                                ? img19
                                                                                                : src === '../../images/banner-sample-9.jpg'
                                                                                                    ? img20
                                                                                                    : src === '../../images/banner-sample-10.jpg'
                                                                                                        ? img21
                                                                                                        : src === '../../images/banner-sample-11.jpg'
                                                                                                            ? img22
                                                                                                            : src === '../../images/stunning.png'
                                                                                                                ? img23
                                                                                                                : src === '../../images/sub-banner-1.jpg'
                                                                                                                    ? img24
                                                                                                                    : src === '../../images/sub-banner-2.jpg'
                                                                                                                        ? img25
                                                                                                                        : src === '../../images/sub-banner-3.jpg'
                                                                                                                            ? img26
                                                                                                                            : src === '../../images/sub-banner-4.jpg'
                                                                                                                            && img27
    )
}
