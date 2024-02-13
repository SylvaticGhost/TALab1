'use client'

import {useState} from "react";
import axios, {post} from "axios";


export default function Home() {
  let [rows, setRows] = useState(4)
  let [columns, setColumns] = useState(4)
  let [result, setResult] = useState('')
  const URL = "http://localhost:5035";
  let send_value = ''
  let first_click = false

  let [matrix, setMatrix] = useState()
  function generateMatrix(n, m) {
    if (validationGenerate()) {
      let matrix = []
      for (let i = 0; i < n; i++) {
        matrix.push('')
        for (let j = 0; j < m; j++) {
          matrix[i] = matrix[i] + ' ' + String(Math.floor(Math.random() * 10))//Exuse
        }
      }
      setMatrix(matrix.join('\n'))
      return matrix
    }
  }

  function readFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(event) {
      setMatrix(event.target.result)
    };

    reader.readAsText(file);
  }

  function sendData() {
    let arr = matrix.split('\n')

    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].trim()
      arr[i] = arr[i].split(' ')
      for (let j = 0; j < arr[i].length; j++) {
        arr[i][j] = Number(arr[i][j])
      }
    }

    console.log(arr)
    HttpMessage(arr)
  }

  
  function validationGenerate () {
    if (rows > 1000 || rows < 2 || columns > 1000 || columns < 2) {
      alert('Enter a value between 2 and 1000')
      setRows(4)
      setColumns(4)
      return false
    }
    return true
  }

  
  function validationTextarea(e) {
    const regex = /^[\d\s\n]*$/;
    const input = e.target.value;

    if (!regex.test(input)) {
      e.target.value = input.replace(/[^\d\s\n]/g, ''); // Удаляем все символы, кроме цифр, пробелов и переносов строки
    }
  }

  
  function HttpMessage(arr) {
    axios.post(URL + "/Main/CountZero", {
      Containing: arr
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept' : '*/*',
        'AcceptEncoding' : 'gzip, deflate, br',
      }
    })
      .then(function (response) {
        setResult(String(response.data))
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <main className="flex flex-row gap-7 justify-center p-10">
        <div id="area" className='flex-auto w-30'>
          <h1 className='mb-10'>Fill in the matrix</h1>

          <textarea id="message"
                    className="block p-2.5 w-full h-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Fill in the matrix using a space as a separator between elements and a line break as a separator between rows"
                    value={matrix} onKeyUp={(e)=>{
           validationTextarea(e)
          }} onChange={(e) => {
            setMatrix(e.target.value)
          }}></textarea>

        </div>
        <div id="random_box " className='flex-auto w-30'>
          <h2>OR Generate random matrix</h2>
          <form className="max-w-sm mx-auto mt-10">

            <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 ">Count of
              rows:</label>
            <input type="number" min="2" max='1000' id="number-input" aria-describedby="helper-text-explanation"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-100 p-2.5 "
                   placeholder="" value={rows} onChange={(event) => {
              setRows(event.target.value)
            }}/>
            <label htmlFor="number-input" className="block mt-3 mb-2 text-sm font-medium text-gray-900 ">Count of
              columns:</label>
            <input type="number" min="2" max='1000' id="number-input" aria-describedby="helper-text-explanation"
                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-100 p-2.5 "
                   placeholder="" value={columns} onChange={(event) => {
              setColumns(event.target.value)
            }}/>

            <button type="button" onClick={() => {
              generateMatrix(rows, columns)
            }}
                    className="text-white mt-10 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Generate
            </button>

          </form>

        </div>
        <div id="drag_n" className='flex-auto w-30'>
          <h2 className='pb-10'>OR Download a data file</h2>
          <div className="w-[300px] relative border-2 border-gray-300 border-dashed rounded-lg p-6" id="dropzone">
            <input type="file" className="absolute inset-0 w-full h-full opacity-0 z-50" onChange={
              (e) => {
                readFile(e)
              }
            }/>
            <div className="text-center">
              <img className="mx-auto h-12 w-12" src="https://www.svgrepo.com/show/389177/file-input.svg" alt=""/>

              <h3 className="mt-2 text-sm font-medium text-gray-900">
                <label htmlFor="file-upload" className="relative cursor-pointer">
                  <span>Drag and drop</span>
                  <span className="text-indigo-600"> or browse </span>
                  <span>to upload</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={
                    (e) => {
                      readFile(e)
                    }
                  }/>
                </label>
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                TXT Files
              </p>
            </div>

            <img src="" className="mt-4 mx-auto max-h-40 hidden" id="preview" alt={'jj'}/>
          </div>
        </div>
      </main>
      <div className="output flex justify-center pt-20">
        <button type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                onClick={() => {
                  setMatrix('');
                  setRows(4)
                  setColumns(4)
                }}>Reset
        </button>
        <button
          className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 "
          onClick={() => {
            sendData()
            send_value = matrix
            first_click = true
          }}>
              <span
                className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
              Send
              </span>
        </button>
      </div>
      <div className="p-4 mb-4 mt-5 ml-10 w-96 text-sm text-green-800 rounded-lg bg-green-50 "
           role="alert">
        <span className="font-medium text-base">Count of zeros: </span> {result}   {matrix !== send_value && first_click? '  (matrix changed)' : ''}
      </div>
    </>
  );
}
