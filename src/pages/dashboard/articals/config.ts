import * as Showdown from "showdown";
import hljs from "highlight.js";

let langType = (left: string) => (left.match(/class=\"([^ \"]+)/) || [])[1];

Showdown.extension("codehighlight", function() {
  // This function should be install only in blog viewer.
  const htmlunencode = text =>
    text
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");

  return [
    {
      type: "output",
      filter: function(text, converter, options) {
        var left = "<pre><code\\b[^>]*>",
          right = "</code></pre>",
          flags = "g";
        var replacement = function(wholeMatch, match, left, right) {
          // match = htmlunencode(match);
          let lang = langType(left);
          left = left.slice(0, 18) + "hljs " + left.slice(18);
          if (lang && hljs.getLanguage(lang)) {
            return left + hljs.highlight(lang, match).value + right;
          } else {
            return left + hljs.highlightAuto(match).value + right;
          }
        };
        return Showdown.helper.replaceRecursiveRegExp(
          text,
          replacement,
          left,
          right,
          flags
        );
      }
    }
  ];
});

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true,
  extensions: ["codehighlight"]
});

export { converter };
