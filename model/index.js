const waveModel = require('../model/wave');
const rectModel = require('../model/rect');
const sliceModel = require('../model/slice');
const eggModel = require('../model/egg');
const sharkModel = require('../model/shark');
const roundedModel = require('../model/rounded');
const softModel = require('../model/soft');
const { isGradientColor } = require('../src/verification');

const models = {
    wave : { render: waveModel.render },
    rect : { render: rectModel.render },
    slice : { render: sliceModel.render },
    egg : { render: eggModel.render },
    shark : { render: sharkModel.render },
    rounded : { render: roundedModel.render },
    soft : { render: softModel.render },
    style : function (section, fontSize = '80') {
        let css = 	`.text {
						font-size: ${fontSize}px;
						font-weight: 700;
						font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
					}`;
		
        if (section === 'footer')
            css += 	`path {
						transform: rotate(180deg);
						transform-origin: 50% 50%;
					}`;
		
        return css;
    },
    gradientDef : function (color) {
        if (!isGradientColor(color))
            return '';
        
        let offset = '';
        for (key in color) {
            offset += `<stop offset="${key}%" stop-color="#${color[key]}"/>`;
        }

        return `<defs>
					<linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
						${offset}
					</linearGradient>
				</defs>
				`;
    },
    textBg : function (bgColor, posX, posY, fontHeight, text) {
		// 40 : padding value
		const height = Number(fontHeight) + 40;
		// 0.5 : temp sizing.
		const width = text.length * Number(fontHeight) * 0.5 + 40;
        return `
        <rect fill="#${bgColor}" height="${height}" width ="${width}" x="${posX}%" y="${posY}%" transform="translate(-${width/2}, -${height/2})"  rx ="25" ry ="25" />
        `;
    },
	animation : function (animation, fontAlign, fontAlignY) {
		if (!animation)
			return '';
		
		let css = '';
		switch (animation) {
			case 'fadeIn':
				css += `.text {
							animation: fadeIn 1.2s ease-in-out forwards;
						}`;
				css += `@keyframes fadeIn {
						  from {
							opacity: 0;
						  }
						  to {
							opacity: 1;
						  }
						};`;
			break;
			case 'scaleIn':
				css += `.text {
							animation: scaleIn .8s ease-in-out forwards;
						}`;
				css += `@keyframes scaleIn {
						  from {
							transform: translate(${fontAlign}%, ${fontAlignY}%) scale(0);
						  }
						  to {
							transform: translate(0%, 0%) scale(1);
						  }
						};`;
			break;
			default:
		}
		
		return css;
	}
}

module.exports = models;
