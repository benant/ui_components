# web ui components
Web UI Components

## DropDown

JQuery 플러그인으로 작동하는 DropDown Seletor 입니다.

예제: [dropdown/index.html](./dropdown/index.html) 

```
$('#target')
    .dropdown('init); // Dropbox DOM 생성
    .dropdown('add_search'); // 검색 추가
    .dropdown('add', {value:'고유키값', text:'<img src="..."> 표시글자'}) // 데이터 추가
    .dropdown('select', '고유키값') // 항목 선택

let selected_value = $('#target').dropdown('selected') // 선택된 항목의 값
```

## Flag 
국기 표시용 CSS

```
<i class="flag af"></i>
```
