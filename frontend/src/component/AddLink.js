import { useState, useEffect } from "react";
import axios from "redaxios";

const AddLink = () => {
  const [link, setLink] = useState("");
  const [author, setAuthor] = useState("");
  const [datas, setDatas] = useState([]);
  const [boolean, setBoolean] = useState(false);
  const [linkList, setLinkList] = useState([]);

  useEffect(() => {
    console.log("hello");
    axios.get("http://localhost:8080").then((data) => {
      setDatas(data.data);
      // setLinkList(data.data);
    });
  }, [linkList]);

  function addLink() {
    // made the link and the author into an object
    let newObject = {
      link: link,
      author: author,
    };
    console.log(newObject);
    // /api/share, posted the new object
    axios.post("http://localhost:8080/api/share", newObject).then((data) => {
      console.log("id", data.data[0]);

      // console.log(boolean);
      // setDatas(datas);
      // new instance of the list
      let newList = linkList;
      // added that object to the list
      newList.push(newObject);
      // print it out
      console.log("new list", newList);
      setLinkList(newList);
      // setBoolean(!boolean);
    });
  }

  return (
    <div>
      <form>
        <label>Link:</label>
        <input
          type="text"
          required
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <label>Author:</label>
        <input
          required
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <p>{link}</p>
        <p>{author}</p>
        {/* {datas && (
          <p>
            {datas.map((data) => {
              return <h2>{data.link}</h2>;
            })}
          </p>
        )} */}
        {linkList.map((item, index) => {
          return (
            <div key={index}>
              {item.link} author: {item.author}
            </div>
          );
        })}
      </form>
      <button onClick={addLink}>Add</button>
    </div>
  );
};

export default AddLink;
