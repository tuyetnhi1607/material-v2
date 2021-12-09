import React, {useEffect, useState, useRef} from "react";
import DisplayImage from "../Upload";
import './editor.scss'
function EditorBlog() {
    const check = false;
    const [state, setState] = useState({});
    const arr = [];
    const Box = useRef()
  var oDoc, sDefTxt;
  useEffect(() => {
    var img = document.createElement("img");
    img.src = state.image
    if(state.image)
     Box.current.appendChild(img)
  }, [state])
  const initDoc = () => {
    oDoc = document.getElementById("textBox");
       sDefTxt = oDoc.innerHTML;
 
    if (check) setDocMode(true);
  };

  function setDocMode(bToSource) {
    var oContent;
    if (bToSource) {
      oContent = document.createTextNode(oDoc.innerHTML);
      oDoc.innerHTML = "";
      var oPre = document.createElement("pre");
      oDoc.contentEditable = false;
      oPre.id = "sourceText";
      oPre.contentEditable = true;
      oPre.appendChild(oContent);
      oDoc.appendChild(oPre);
      document.execCommand("defaultParagraphSeparator", false, "div");
    } else {
      if (document.all) {
        oDoc.innerHTML = oDoc.innerText;
      } else {
        oContent = document.createRange();
        oContent.selectNodeContents(oDoc.firstChild);
        oDoc.innerHTML = oContent.toString();
      }
      oDoc.contentEditable = true;
    }
  }

  function validateMode() {

    if (!check) {
      return true;
    }
    alert('Uncheck "Show HTML".');
    return false;
  }
  function formatDoc(aCmdName, aDom) {
    if (validateMode()) {
      document.execCommand(aCmdName, false, aDom);
    }
  }
  function printDoc() {
    if (!validateMode()) {
      return;
    }
    var oPrntWin = window.open(
      "",
      "_blank",
      "width=450,height=470,left=400,top=100,menubar=yes,toolbar=no,location=no,scrollbars=yes"
    );
    oPrntWin.document.open();
    oPrntWin.document.write(
      '<!doctype html><html><head><title>Print</title></head><body onLoad="print();">' +
        oDoc.innerHTML +
        "</body></html>"
    );
    oPrntWin.document.close();
  }
  const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      var newArr = {image: URL.createObjectURL(img)}
      setState(newArr);
    }
    
  };
  const handleSubmit = (check) => {
    if(check){
        document.getElementById('myDoc').value = oDoc.innerHTML;
    }
  }
  return (
    <div onLoad={initDoc}>
      <form onSubmit={() => handleSubmit(validateMode())} name="compForm">
        <div classNameName="toolbar1">
          <select 
            onChange={(e) =>formatDoc('formatBlock', e.target.value)}
          >
            <option selected>- formatting -</option>
            <option value="h1">Title 1 &lt;h1&gt;</option>
            <option value="h2">Title 2 &lt;h2&gt;</option>
            <option value="h3">Title 3 &lt;h3&gt;</option>
            <option value="h4">Title 4 &lt;h4&gt;</option>
            <option value="h5">Title 5 &lt;h5&gt;</option>
            <option value="h6">Subtitle &lt;h6&gt;</option>
            <option value="p">Paragraph &lt;p&gt;</option>
            <option value="pre">Preformatted &lt;pre&gt;</option>
          </select>
          <select onChange={(e) =>formatDoc('fontname', e.target.value)}>
            <option className="heading" selected>- font -</option>
            <option>Arial</option>
            <option>Arial Black</option>
            <option>Courier New</option>
            <option>Times New Roman</option>
        </select>
        <select onChange={(e) =>formatDoc('fontsize', e.target.value)}>
                <option className="heading" selected>- size -</option>
                <option value="1">Very small</option>
                <option value="2">A bit small</option>
                <option value="3">Normal</option>
                <option value="4">Medium-large</option>
                <option value="5">Big</option>
                <option value="6">Very big</option>
                <option value="7">Maximum</option>
            </select>
            <select onChange={(e) =>formatDoc('forecolor', e.target.value)}>
                <option className="heading" selected>- color -</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="black">Black</option>
            </select>
            <select onChange={(e) =>formatDoc('backcolor', e.target.value)}>
                <option className="heading" selected>- background -</option>
                <option value="red">Red</option>
                <option value="green">Green</option>
                <option value="black">Black</option>
            </select>
        </div>
        <div id="toolBar2">
          <img alt="" className="intLink" title="Print" onClick={printDoc}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9oEBxcZFmGboiwAAAAIdEVYdENvbW1lbnQA9syWvwAAAuFJREFUOMvtlUtsjFEUx//n3nn0YdpBh1abRpt4LFqtqkc3jRKkNEIsiIRIBBEhJJpKlIVo4m1RRMKKjQiRMJRUqUdKPT71qpIpiRKPaqdF55tv5vvusZjQTjOlseUkd3Xu/3dPzusC/22wtu2wRn+jG5So/OCDh8ycMJDflehMlkJkVK7KUYN+ufzA/RttH76zaVocDptRxzQtNi3mRWuPc+6cKtlXZ/sddP2uu9uXlmYXZ6Qm8v4Tz8lhF1H+zDQXt7S8oLMXtbF4e8QaFHjj3kbP2MzkktHpiTjp9VH6iHiA+whtAsX5brpwueMGdONdf/2A4M7ukDs1JW662+XkqTkeUoqjKtOjm2h53YFL15pSJ04Zc94wdtibr26fXlC2mzRvBccEbz2kiRFD414tKMlEZbVGT33+qCoHgha81SWYsew0r1uzfNylmtpx80pngQQ91LwVk2JGvGnfvZG6YcYRAT16GFtW5kKKfo1EQLtfh5Q2etT0BIWF+aitq4fDbk+ImYo1OxvGF03waFJQvBCkvDffRyEtxQiFFYgAZTHS0zwAGD7fG5TNnYNTp8/FzvGwJOfmgG7GOx0SAKKgQgDMgKBI0NJGMEImpGDk5+WACEwEd0ywblhGUZ4Hw5OdUekRBLT7DTgdEgxACsIznx8zpmWh7k4rkpJcuHDxCul6MDsmmBXDlWCH2+XozSgBnzsNCEE4euYV4pwCpsWYPW0UHDYBKSWu1NYjENDReqtKjwn2+zvtTc1vMSTB/mvev/WEYSlASsLimcOhOBJxw+N3aP/SjefNL5GePZmpu4kG7OPr1+tOfPyUu3BecWYKcwQcDFmwFKAUo90fhKDInBCAmvqnyMgqUEagQwCoHBDc1rjv9pIlD8IbVkz6qYViIBQGTJPx4k0XpIgEZoRN1Da0cij4VfR0ta3WvBXH/rjdCufv6R2zPgPH/e4pxSBCpeatqPrjNiso203/5s/zA171Mv8+w1LOAAAAAElFTkSuQmCC"/>
            <img alt="" className="intLink" title="Undo" onClick={()=>formatDoc('undo')}
                src="data:image/gif;base64,R0lGODlhFgAWAOMKADljwliE33mOrpGjuYKl8aezxqPD+7/I19DV3NHa7P///////////////////////yH5BAEKAA8ALAAAAAAWABYAAARR8MlJq7046807TkaYeJJBnES4EeUJvIGapWYAC0CsocQ7SDlWJkAkCA6ToMYWIARGQF3mRQVIEjkkSVLIbSfEwhdRIH4fh/DZMICe3/C4nBQBADs=" />
            <img alt="" className="intLink" title="Redo" onClick={() => formatDoc('redo')}
                src="data:image/gif;base64,R0lGODlhFgAWAMIHAB1ChDljwl9vj1iE34Kl8aPD+7/I1////yH5BAEKAAcALAAAAAAWABYAAANKeLrc/jDKSesyphi7SiEgsVXZEATDICqBVJjpqWZt9NaEDNbQK1wCQsxlYnxMAImhyDoFAElJasRRvAZVRqqQXUy7Cgx4TC6bswkAOw==" />
            <img alt="" className="intLink" title="Remove formatting" onClick={() => formatDoc('removeformat')}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABGdBTUEAALGPC/xhBQAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB9oECQMCKPI8CIIAAAAIdEVYdENvbW1lbnQA9syWvwAAAuhJREFUOMtjYBgFxAB501ZWBvVaL2nHnlmk6mXCJbF69zU+Hz/9fB5O1lx+bg45qhl8/fYr5it3XrP/YWTUvvvk3VeqGXz70TvbJy8+Wv39+2/Hz19/mGwjZzuTYjALuoBv9jImaXHeyD3H7kU8fPj2ICML8z92dlbtMzdeiG3fco7J08foH1kurkm3E9iw54YvKwuTuom+LPt/BgbWf3//sf37/1/c02cCG1lB8f//f95DZx74MTMzshhoSm6szrQ/a6Ir/Z2RkfEjBxuLYFpDiDi6Af///2ckaHBp7+7wmavP5n76+P2ClrLIYl8H9W36auJCbCxM4szMTJac7Kza////R3H1w2cfWAgafPbqs5g7D95++/P1B4+ECK8tAwMDw/1H7159+/7r7ZcvPz4fOHbzEwMDwx8GBgaGnNatfHZx8zqrJ+4VJBh5CQEGOySEua/v3n7hXmqI8WUGBgYGL3vVG7fuPK3i5GD9/fja7ZsMDAzMG/Ze52mZeSj4yu1XEq/ff7W5dvfVAS1lsXc4Db7z8C3r8p7Qjf///2dnZGxlqJuyr3rPqQd/Hhyu7oSpYWScylDQsd3kzvnH738wMDzj5GBN1VIWW4c3KDon7VOvm7S3paB9u5qsU5/x5KUnlY+eexQbkLNsErK61+++VnAJcfkyMTIwffj0QwZbJDKjcETs1Y8evyd48toz8y/ffzv//vPP4veffxpX77z6l5JewHPu8MqTDAwMDLzyrjb/mZm0JcT5Lj+89+Ybm6zz95oMh7s4XbygN3Sluq4Mj5K8iKMgP4f0////fv77//8nLy+7MCcXmyYDAwODS9jM9tcvPypd35pne3ljdjvj26+H2dhYpuENikgfvQeXNmSl3tqepxXsqhXPyc666s+fv1fMdKR3TK72zpix8nTc7bdfhfkEeVbC9KhbK/9iYWHiErbu6MWbY/7//8/4//9/pgOnH6jGVazvFDRtq2VgiBIZrUTIBgCk+ivHvuEKwAAAAABJRU5ErkJggg=="/>
            <img alt="" className="intLink" title="Bold" onClick={() => formatDoc('bold')}
                src="data:image/gif;base64,R0lGODlhFgAWAID/AMDAwAAAACH5BAEAAAAALAAAAAAWABYAQAInhI+pa+H9mJy0LhdgtrxzDG5WGFVk6aXqyk6Y9kXvKKNuLbb6zgMFADs=" />
            <img alt="" className="intLink" title="Italic" onClick={() => formatDoc('italic')}
                src="data:image/gif;base64,R0lGODlhFgAWAKEDAAAAAF9vj5WIbf///yH5BAEAAAMALAAAAAAWABYAAAIjnI+py+0Po5x0gXvruEKHrF2BB1YiCWgbMFIYpsbyTNd2UwAAOw==" />
            <img alt="" className="intLink" title="Underline" onClick={() => formatDoc('underline')}
                src="data:image/gif;base64,R0lGODlhFgAWAKECAAAAAF9vj////////yH5BAEAAAIALAAAAAAWABYAAAIrlI+py+0Po5zUgAsEzvEeL4Ea15EiJJ5PSqJmuwKBEKgxVuXWtun+DwxCCgA7" />
            <img alt="" className="intLink" title="Left align" onClick={() => formatDoc('justifyleft')}
                src="data:image/gif;base64,R0lGODlhFgAWAID/AMDAwAAAACH5BAEAAAAALAAAAAAWABYAQAIghI+py+0Po5y02ouz3jL4D4JMGELkGYxo+qzl4nKyXAAAOw==" />
            <img alt="" className="intLink" title="Center align" onClick={() => formatDoc('justifycenter')}
                src="data:image/gif;base64,R0lGODlhFgAWAID/AMDAwAAAACH5BAEAAAAALAAAAAAWABYAQAIfhI+py+0Po5y02ouz3jL4D4JOGI7kaZ5Bqn4sycVbAQA7" />
            <img alt="" className="intLink" title="Right align" onClick={() => formatDoc('justifyright')}
                src="data:image/gif;base64,R0lGODlhFgAWAID/AMDAwAAAACH5BAEAAAAALAAAAAAWABYAQAIghI+py+0Po5y02ouz3jL4D4JQGDLkGYxouqzl43JyVgAAOw==" />
            <img alt="" className="intLink" title="Numbered list" onClick={() => formatDoc('insertorderedlist')}
                src="data:image/gif;base64,R0lGODlhFgAWAMIGAAAAADljwliE35GjuaezxtHa7P///////yH5BAEAAAcALAAAAAAWABYAAAM2eLrc/jDKSespwjoRFvggCBUBoTFBeq6QIAysQnRHaEOzyaZ07Lu9lUBnC0UGQU1K52s6n5oEADs=" />
            <img alt="" className="intLink" title="Dotted list" onClick={() => formatDoc('insertunorderedlist')}
                src="data:image/gif;base64,R0lGODlhFgAWAMIGAAAAAB1ChF9vj1iE33mOrqezxv///////yH5BAEAAAcALAAAAAAWABYAAAMyeLrc/jDKSesppNhGRlBAKIZRERBbqm6YtnbfMY7lud64UwiuKnigGQliQuWOyKQykgAAOw==" />
            <img alt="" className="intLink" title="Quote" onClick={() => formatDoc('blockquote')}
                src="data:image/gif;base64,R0lGODlhFgAWAIQXAC1NqjFRjkBgmT9nqUJnsk9xrFJ7u2R9qmKBt1iGzHmOrm6Sz4OXw3Odz4Cl2ZSnw6KxyqO306K63bG70bTB0rDI3bvI4P///////////////////////////////////yH5BAEKAB8ALAAAAAAWABYAAAVP4CeOZGmeaKqubEs2CekkErvEI1zZuOgYFlakECEZFi0GgTGKEBATFmJAVXweVOoKEQgABB9IQDCmrLpjETrQQlhHjINrTq/b7/i8fp8PAQA7" />
            <img alt="" className="intLink" title="Delete indentation" onClick={() => formatDoc('outdent')}
                src="data:image/gif;base64,R0lGODlhFgAWAMIHAAAAADljwliE35GjuaezxtDV3NHa7P///yH5BAEAAAcALAAAAAAWABYAAAM2eLrc/jDKCQG9F2i7u8agQgyK1z2EIBil+TWqEMxhMczsYVJ3e4ahk+sFnAgtxSQDqWw6n5cEADs=" />
            <img alt="" className="intLink" title="Add indentation" onClick={() => formatDoc('outdent')}
                src="data:image/gif;base64,R0lGODlhFgAWAOMIAAAAADljwl9vj1iE35GjuaezxtDV3NHa7P///////////////////////////////yH5BAEAAAgALAAAAAAWABYAAAQ7EMlJq704650B/x8gemMpgugwHJNZXodKsO5oqUOgo5KhBwWESyMQsCRDHu9VOyk5TM9zSpFSr9gsJwIAOw==" />
            <img alt="" className="intLink" title="Cut" onClick={() => formatDoc('cut')}
                src="data:image/gif;base64,R0lGODlhFgAWAIQSAB1ChBFNsRJTySJYwjljwkxwl19vj1dusYODhl6MnHmOrpqbmpGjuaezxrCztcDCxL/I18rL1P///////////////////////////////////////////////////////yH5BAEAAB8ALAAAAAAWABYAAAVu4CeOZGmeaKqubDs6TNnEbGNApNG0kbGMi5trwcA9GArXh+FAfBAw5UexUDAQESkRsfhJPwaH4YsEGAAJGisRGAQY7UCC9ZAXBB+74LGCRxIEHwAHdWooDgGJcwpxDisQBQRjIgkDCVlfmZqbmiEAOw==" />
            <img alt="" className="intLink" title="Copy" onClick={() => formatDoc('copy')}
                src="data:image/gif;base64,R0lGODlhFgAWAIQcAB1ChBFNsTRLYyJYwjljwl9vj1iE31iGzF6MnHWX9HOdz5GjuYCl2YKl8ZOt4qezxqK63aK/9KPD+7DI3b/I17LM/MrL1MLY9NHa7OPs++bx/Pv8/f///////////////yH5BAEAAB8ALAAAAAAWABYAAAWG4CeOZGmeaKqubOum1SQ/kPVOW749BeVSus2CgrCxHptLBbOQxCSNCCaF1GUqwQbBd0JGJAyGJJiobE+LnCaDcXAaEoxhQACgNw0FQx9kP+wmaRgYFBQNeAoGihCAJQsCkJAKOhgXEw8BLQYciooHf5o7EA+kC40qBKkAAAGrpy+wsbKzIiEAOw==" />
            <img alt="" className="intLink" title="Paste" onClick={() => formatDoc('paste')}
                src="data:image/gif;base64,R0lGODlhFgAWAIQUAD04KTRLY2tXQF9vj414WZWIbXmOrpqbmpGjudClFaezxsa0cb/I1+3YitHa7PrkIPHvbuPs+/fvrvv8/f///////////////////////////////////////////////yH5BAEAAB8ALAAAAAAWABYAAAWN4CeOZGmeaKqubGsusPvBSyFJjVDs6nJLB0khR4AkBCmfsCGBQAoCwjF5gwquVykSFbwZE+AwIBV0GhFog2EwIDchjwRiQo9E2Fx4XD5R+B0DDAEnBXBhBhN2DgwDAQFjJYVhCQYRfgoIDGiQJAWTCQMRiwwMfgicnVcAAAMOaK+bLAOrtLUyt7i5uiUhADs=" />
            <input type="file" name="myImage" onChange={(e)=>{onImageChange(e)}} />
            <DisplayImage />
        </div>
        <div id="textBox" ref={Box} contentEditable="true" autoFocus>
            <p>Lorem ipsum</p>
        </div>
        <p id="editMode"><input type="checkbox" name="switchMode" id="switchBox" onChange={(e)=>setDocMode(e.target.checked)} />
            <label for="switchBox">Show HTML</label></p>
        <p><input type="submit" value="Send" /></p>
      </form>
      
    </div>
  );
}

export default EditorBlog;
