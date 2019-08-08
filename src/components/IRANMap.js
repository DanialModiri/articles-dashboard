import React from 'react'
import './IRAMMap.css'
import classNames from 'classnames'
import paths from './IranMapPaths';

const states = {
    'alborz': {
        name: 'البرز',
        commentsNumber: 150
    },
    'ardabil': {
        name: 'اردبیل',
        commentsNumber: 358
    },
    'lorestan': {
        name: 'لرستان',
        commentsNumber: 155
    },
    'azerbaijan-east': {
        name: 'آذربایجان شمالی',
        commentsNumber: 152
    },
    'azerbaijan-west': {
        name: 'آذربایجان غربی',
        commentsNumber: 452
    },
    'zanjan': {
        name: 'زنجان',
        commentsNumber: 788
    },
    'kurdistan': {
        name: 'کردستان',
        commentsNumber: 455
    },
    'yazd': {
        name: 'یزد',
        commentsNumber: 78
    },
    'tehran': {
        name: 'تهران',
        commentsNumber: 1588
    },
    'sistan-baluchestan': {
        name: 'سیستان بلوچستان',
        commentsNumber: 0
    },
    'kerman': {
        name: 'کرمان',
        commentsNumber: 15
    },
    'fars': {
        name: 'فارس',
        commentsNumber: 454
    },
    'bushehr': {
        name: 'بوشهر',
        commentsNumber: 877
    },
    'khuzestan': {
        name: 'خوزستان',
        commentsNumber: 78
    },
    'isfahan': {
        name: 'اصفهان',
        commentsNumber: 78
    },
    'semnan': {
        name: 'سمنان',
        commentsNumber: 789
    },
    'khorasan-razavi': {
        name: 'خراسان رضوی',
        commentsNumber: 788
    },
    'khorasan-north': {
        name: 'خراسان شمالی',
        commentsNumber: 89
    },
    'golestan': {
        name: 'گلستان',
        commentsNumber: 788
    },
    'gilan': {
        name: 'گیلان'
    },
    'mazandaran': {
        name: 'مازندان'
    },
    'golestan': {
        name: 'گلستان'
    },
    'kermanshah': {
        name: 'کرمانشاه'
    },
    'markazi': {
        name: 'مرکزی'
    },
    'qom': {
        name: 'قم'
    },
    'ilam': {
        name: 'ایلام'
    },
    'hamadan': {
        name: 'همدان'
    },
    'chaharmahal-bakhriari': {
        name: 'چاهمهار بختیاری'
    },
    'kohgiluye-boyerahmad': {
        name: 'کهکیلوییه و بویراحمد'
    },
    'khorasan-south': {
        name: 'خراسان جنوبی'
    },
    'hormozgan': {
        name: 'هرمزگان'
    },
    'qazvin': {
        name: 'قزوین'
    }
}

export function convertToObj(key){
    return states[key];
}



console.log(paths)

class IRANMap extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        selectedPath: null
    }

    onPathClick = (state) => (e) => {
        this.props.onChange(states[state], state);
        this.setState({ selectedPath: state }, () => {
            console.log(this.state.selectedPath)
        });
    }

    render() {
        const { style } = this.props;


        return <div className="map-container" style={style}>
            <svg version="1.1" 
            id="iran"
            xmlnsSodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
            xmlnsDc="http://purl.org/dc/elements/1.1/" xmlnsCc="http://creativecommons.org/ns#"
            xmlnsInkscape="http://www.inkscape.org/namespaces/inkscape" xmlnsSvg="http://www.w3.org/2000/svg"
            xmlnsNs="http://ns.adobe.com/SaveForWeb/1.0/" xmlnsRdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
            inkscapeVersion="0.48.2 r9819" xmlns="http://www.w3.org/2000/svg"
            x="0px" y="0px" viewBox="0 0 1200 1070.6"
            enable-background="new 0 0 1200 1070.6" xmlSpace="preserve"
            >
            <g id="provinces">
                {paths.map(item => <path key={item.id} d={item.d}
                className={classNames({'selected-path': item.id === this.state.selectedPath})}
                 stroke="#9B9B9B" onClick={this.onPathClick(item.id)} />)}
            </g>
        </svg>
        </div>
    }
}

export default IRANMap;