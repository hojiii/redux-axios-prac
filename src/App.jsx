// import axios from "axios";
import api from "./axios/api";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(null);
  const [inputValue, setInputValue] = useState({
    title: "",
  });
  const [targetId, setTargetId] = useState("");
  const [contents, setConstents] = useState("");

  //조회함수
  const fetchTodos = async () => {
    // const { data } = await axios.get("http://localhost:4000/todos");
    const { data } = await api.get("/todos");
    //console.log("data", data);
    setTodos(data);
  };

  //추가함수
  const onSubmitHandler = async () => {
    api.post("/todos", inputValue);
    //setTodos([...todos, inputValue]);
    fetchTodos();
  };

  //삭제함수
  const onDeletebuttomClickHandler = async (id) => {
    api.delete(`/todos/${id}`);
    setTodos(
      todos.filter((item) => {
        return item.id !== id;
      })
    );
  };

  //수정 함수
  const onUpdateButtonClickHandler = async () => {
    api.patch(`${process.env.REACT_APP_SERVER_URL}/todos/${targetId}`, {
      title: contents,
    });
    setTodos(
      todos.map((item) => {
        if (item.id == targetId) {
          return { ...item, title: contents };
        } else {
          return item;
        }
      })
    );
  };

  useEffect(() => {
    //db로부터 값을 가져올 것이다.
    fetchTodos();
  }, []);

  return (
    <>
      <div>
        {/* 수정영역 */}
        <input
          type="text"
          placeholder="수정할 아이디"
          value={targetId}
          onChange={(e) => {
            setTargetId(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="수정할 내용"
          value={contents}
          onChange={(e) => {
            setConstents(e.target.value);
          }}
        />
        <button onClick={onUpdateButtonClickHandler}>수정</button>
        <br />
        <br />
      </div>
      <div>
        {/* {INPUT 영역} */}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            //버튼 클릭시 input에 들어있는 값(state)를 이용하여 DB에 저장(post 요청)
            onSubmitHandler();
          }}
        >
          <input
            type="text"
            value={inputValue.title}
            onChange={(e) => {
              setInputValue({
                title: e.target.value,
              });
            }}
          />
          <button>추가</button>
        </form>
      </div>
      <div>
        {/* 데이터 영역 */}
        {todos?.map((item) => {
          return (
            <div key={item.id}>
              {item.id} : {item.title}
              &nbsp;
              <button onClick={() => onDeletebuttomClickHandler(item.id)}>
                삭제
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
