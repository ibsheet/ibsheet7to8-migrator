# Tree 기능 사용시 JSON ***(Data Structure)***

> 특정 컬럼을 Tree 형태로 사용시 데이터 JSON의 기본 구조는 다음과 같습니다.


## Example
```json
{
  data:[
    {sa_nm:"김사장",job:" PRESIDENT",
      Items:[                                       //0 LEVEL
        {sa_nm:"안전무",job:"GMANAGER"},            //1 LEVEL
        {sa_nm:"이상무",job:"GMANAGER",
          Items:[                                   //1LEVEL
            {sa_nm:"박대리",job:"ASSISTANT"}        //2LEVEL
          ]
        }
      ]
    }
  ]
}
```

단 위와 같은 json 구조를 구성하기 어려울 경우, xml과 같이 Level 프로퍼티를 이용한 방법도 기능으로 제공하고 있습니다.<br>
Level 속성을 사용해서 데이터를 받아올 때는 반드시 `(Cfg)UseJsonTreeLevel : 1` 을 설정해야합니다.
## Example
```json
{
  data:[
    {sa_nm:"김사장",job:" PRESIDENT",Level:0},   //0 LEVEL
    {sa_nm:"안전무",job:"GMANAGER",Level:1},     //1 LEVEL
    {sa_nm:"이상무",job:"GMANAGER",Level:1},     //1LEVEL
    {sa_nm:"박대리",job:"ASSISTANT",Level:2}     //2LEVEL
  ]
}
```