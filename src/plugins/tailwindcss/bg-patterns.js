const plugin = require("tailwindcss/plugin");
const flattenColorPalette = require("tailwindcss/lib/util/flattenColorPalette").default;

// Plugin rewritten from https://github.com/thillmann/tailwindcss-bg-patterns
// Adapted to work with the new matchUtilities API from Tailwind v3

const patterns = [
  {
    name: "lines",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage: `linear-gradient(0deg, var(--pattern-bg-color, transparent) 50%, var(--pattern-color) 50%)`,
      backgroundSize: `var(--pattern-size, 40px) var(--pattern-size, 40px)`,
    },
  },
  {
    name: "vertical-lines",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage: `linear-gradient(to right, var(--pattern-color), var(--pattern-color) var(--pattern-size-half, 20px), var(--pattern-bg-color, transparent) var(--pattern-size-half, 20px), var(--pattern-bg-color, transparent))`,
      backgroundSize: `var(--pattern-size, 40px) var(--pattern-size, 40px)`,
    },
  },
  {
    name: "dots",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage: `radial-gradient(var(--pattern-color) calc(var(--pattern-size, 40px) * 0.1), var(--pattern-bg-color) calc(var(--pattern-size, 40px) * 0.1))`,
      backgroundSize: "var(--pattern-size, 40px) var(--pattern-size, 40px)",
    },
  },
  {
    name: "rhombus",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage: `linear-gradient(135deg, var(--pattern-color) 25%, transparent 25%), linear-gradient(225deg, var(--pattern-color) 25%, transparent 25%), linear-gradient(45deg, var(--pattern-color) 25%, transparent 25%), linear-gradient(315deg, var(--pattern-color) 25%, var(--pattern-bg-color) 25%)`,
      backgroundPosition: "var(--pattern-size, 40px) 0, var(--pattern-size, 40px) 0, 0 0, 0 0",
      backgroundSize: "var(--pattern-size, 40px) var(--pattern-size, 40px)",
      backgroundRepeat: "repeat",
    },
  },
  {
    name: "cross",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      background: `radial-gradient(circle, transparent 20%, var(--pattern-bg-color) 20%, var(--pattern-bg-color) 80%, transparent 80%, transparent), radial-gradient(circle, transparent 20%, var(--pattern-bg-color) 20%, var(--pattern-bg-color) 80%, transparent 80%, transparent) var(--pattern-size-half, 20px) var(--pattern-size-half, 20px), linear-gradient(var(--pattern-color) calc(var(--pattern-size, 40px) * 0.04), transparent calc(var(--pattern-size, 40px) * 0.04)) 0 calc(var(--pattern-size, 40px) * -0.02), linear-gradient(90deg, var(--pattern-color) calc(var(--pattern-size, 40px) * 0.04), var(--pattern-bg-color) calc(var(--pattern-size, 100px) * 0.04)) calc(var(--pattern-size, 40px) * -0.02) 0`,
      backgroundSize: `var(--pattern-size, 40px) var(--pattern-size, 20px), var(--pattern-size, 40px) var(--pattern-size, 20px), var(--pattern-size-half, 20px) var(--pattern-size-half, 20px), var(--pattern-size-half, 20px) var(--pattern-size-half, 20px)`,
    },
  },
  {
    name: "wavy",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage:
        "repeating-radial-gradient( circle at 0 0, transparent 0, var(--pattern-bg-color, transparent) var(--pattern-size, 40px) ), repeating-linear-gradient( var(--pattern-color-55), var(--pattern-color) )",
    },
  },
  {
    name: "zigzag",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage:
        "linear-gradient(135deg, var(--pattern-color) 25%, transparent 25%), linear-gradient(225deg, var(--pattern-color) 25%, transparent 25%), linear-gradient(45deg, var(--pattern-color) 25%, transparent 25%), linear-gradient(315deg, var(--pattern-color) 25%, var(--pattern-bg-color, transparent) 25%)",
      backgroundPosition: "var(--pattern-size-half, 20px) 0, var(--pattern-size-half, 20px) 0, 0 0, 0 0",
      backgroundSize: "var(--pattern-size, 40px) var(--pattern-size, 40px)",
      backgroundRepeat: "repeat",
    },
  },
  {
    name: "zigzag-3d",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      background:
        "linear-gradient(135deg, var(--pattern-color-55) 25%, transparent 25%) calc(var(--pattern-size, 40px) * -0.5) 0/ var(--pattern-size, 40px) var(--pattern-size, 40px), linear-gradient(225deg, var(--pattern-color) 25%, transparent 25%) calc(var(--pattern-size, 40px) * -0.5) 0/ var(--pattern-size, 40px) var(--pattern-size, 40px), linear-gradient(315deg, var(--pattern-color-55) 25%, transparent 25%) 0px 0/ var(--pattern-size, 40px) var(--pattern-size, 40px), linear-gradient(45deg, var(--pattern-color) 25%, var(--pattern-bg-color) 25%) 0px 0/ var(--pattern-size, 40px) var(--pattern-size, 40px)",
    },
  },
  {
    name: "isometric",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage:
        "linear-gradient(30deg, var(--pattern-color) 12%, transparent 12.5%, transparent 87%, var(--pattern-color) 87.5%, var(--pattern-color)), linear-gradient(150deg, var(--pattern-color) 12%, transparent 12.5%, transparent 87%, var(--pattern-color) 87.5%, var(--pattern-color)), linear-gradient(30deg, var(--pattern-color) 12%, transparent 12.5%, transparent 87%, var(--pattern-color) 87.5%, var(--pattern-color)), linear-gradient(150deg, var(--pattern-color) 12%, transparent 12.5%, transparent 87%, var(--pattern-color) 87.5%, var(--pattern-color)), linear-gradient(60deg, var(--pattern-color-77) 25%, transparent 25.5%, transparent 75%, var(--pattern-color-77) 75%, var(--pattern-color-77)), linear-gradient(60deg, var(--pattern-color-77) 25%, transparent 25.5%, transparent 75%, var(--pattern-color-77) 75%, var(--pattern-color-77))",
      backgroundSize: "var(--pattern-size, 40px) calc(var(--pattern-size, 40px) * 1.75)",
      backgroundPosition:
        "0 0, 0 0, var(--pattern-size-half, 20px) calc(var(--pattern-size, 40px) * 0.875), var(--pattern-size-half, 20px) calc(var(--pattern-size, 40px) * 0.875), 0 0, var(--pattern-size-half, 20px) calc(var(--pattern-size, 40px) * 0.875)",
    },
  },
  {
    name: "boxes",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage:
        "linear-gradient(var(--pattern-color) calc(var(--pattern-size, 40px) * 0.1), transparent calc(var(--pattern-size, 40px) * 0.1)), linear-gradient(to right, var(--pattern-color) calc(var(--pattern-size, 40px) * 0.1), var(--pattern-bg-color, transparent) calc(var(--pattern-size, 40px) * 0.1))",
      backgroundSize: "var(--pattern-size, 40px) var(--pattern-size, 40px)",
    },
  },
  {
    name: "rectangles",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage:
        "repeating-linear-gradient(45deg, var(--pattern-color) 25%, transparent 25%, transparent 75%, var(--pattern-color) 75%, var(--pattern-color)), repeating-linear-gradient(45deg, var(--pattern-color) 25%, var(--pattern-bg-color, transparent) 25%, var(--pattern-bg-color, transparent) 75%, var(--pattern-color) 75%, var(--pattern-color))",
      backgroundPosition: "0 0, var(--pattern-size-half, 20px) var(--pattern-size-half, 20px)",
      backgroundSize: "var(--pattern-size, 40px) var(--pattern-size, 40px)",
    },
  },
  {
    name: "diagonal-lines",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      background:
        "repeating-linear-gradient( 45deg, var(--pattern-color), var(--pattern-color) calc(var(--pattern-size, 40px) * 0.2), var(--pattern-bg-color, transparent) calc(var(--pattern-size, 40px) * 0.2), var(--pattern-bg-color) var(--pattern-size, 40px) )",
    },
  },
  {
    name: "triangles",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage: "linear-gradient(45deg, var(--pattern-color) 50%, var(--pattern-bg-color, transparent) 50%)",
      backgroundSize: "var(--pattern-size, 40px) var(--pattern-size, 40px)",
    },
  },
  {
    name: "moon",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage:
        "radial-gradient( ellipse farthest-corner at var(--pattern-size, 40px) var(--pattern-size, 40px), var(--pattern-color), var(--pattern-color) 50%, var(--pattern-bg-color, transparent) 50%)",
      backgroundSize: "var(--pattern-size, 40px) var(--pattern-size, 40px)",
    },
  },
  {
    name: "paper",
    styles: {
      opacity: "var(--pattern-opacity, 0.4)",
      backgroundColor: "var(--pattern-bg-color, transparent)",
      backgroundImage:
        "linear-gradient(var(--pattern-color) calc(var(--pattern-size, 40px) * 0.04), transparent calc(var(--pattern-size, 40px) * 0.04)), linear-gradient(90deg, var(--pattern-color) calc(var(--pattern-size, 40px) * 0.04), transparent calc(var(--pattern-size, 40px) * 0.04)), linear-gradient(var(--pattern-color) calc(var(--pattern-size, 40px) * 0.02), transparent calc(var(--pattern-size, 40px) * 0.02)), linear-gradient(90deg, var(--pattern-color) 2px, var(--pattern-bg-color, transparent) calc(var(--pattern-size, 40px) * 0.02))",
      backgroundSize:
        "var(--pattern-size, 40px) var(--pattern-size, 40px), var(--pattern-size, 40px) var(--pattern-size, 40px), calc(var(--pattern-size, 40px) * 0.2) calc(var(--pattern-size, 40px) * 0.2), calc(var(--pattern-size, 40px) * 0.2) calc(var(--pattern-size, 40px) * 0.2)",
      backgroundPosition:
        "calc(var(--pattern-size, 40px) * -0.04) calc(var(--pattern-size, 40px) * -0.04), calc(var(--pattern-size, 40px) * -0.04) calc(var(--pattern-size, 40px) * -0.04), calc(var(--pattern-size, 40px) * -0.02) calc(var(--pattern-size, 40px) * -0.02), calc(var(--pattern-size, 40px) * -0.02) calc(var(--pattern-size, 40px) * -0.02)",
    },
  },
];

const defaultOpacities = {
  100: "1",
  80: ".80",
  60: ".60",
  40: ".40",
  20: ".20",
  10: ".10",
  5: ".05",
};

const defaultSizes = {
  1: "0.25rem",
  2: "0.5rem",
  4: "1rem",
  6: "1.5rem",
  8: "2rem",
  16: "4rem",
  20: "5rem",
  24: "6rem",
  32: "8rem",
};

const patternsPlugin = plugin(
  ({ addComponents, matchUtilities, theme }) => {
    matchUtilities(
      {
        pattern: value => ({
          "--pattern-color": value,
          "--pattern-color-55": `${value}55`,
          "--pattern-color-77": `${value}77`,
        }),
        "pattern-bg": value => ({
          "--pattern-bg-color": value,
        }),
      },
      {
        values: flattenColorPalette(theme("colors")),
        type: "color",
      }
    );

    matchUtilities(
      {
        "pattern-opacity": value => ({
          "--pattern-opacity": value,
        }),
      },
      {
        values: theme("patterns.opacity"),
      }
    );

    matchUtilities(
      {
        "pattern-size": value => ({
          "--pattern-size": value,
          "--pattern-size-half": `calc(${value} / 2)`,
        }),
      },
      {
        values: theme("patterns.size"),
      }
    );

    addComponents(
      patterns.reduce((acc, { name: patternName, styles }) => {
        acc[`.pattern-${patternName}`] = styles;
        return acc;
      }, {})
    );
  },
  {
    theme: {
      patterns: {
        opacity: defaultOpacities,
        size: defaultSizes,
      },
    },
  }
);

module.exports = patternsPlugin;
