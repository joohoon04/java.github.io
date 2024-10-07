document.addEventListener("DOMContentLoaded", function() {
    const mainImage = document.getElementById("mainImage");
    const imageTitle = document.getElementById("imageTitle");
    const imageDescription = document.getElementById("imageDescription");

    // 이미지와 관련된 데이터 배열
    const images = [
        {
            key: "A",
            src: "img/sun.png",
            title: "태양",
            description: "태양을 픽셀로 만들어서 공에 이미지를 넣었습니다."
        },
        {
            key: "B",
            src: "img/Saturn.png",
            title: "금성",
            description: "금성을 픽셀로 만들어서 공의 이미지를 넣었습니다."
        },
        {
            key: "C",
            src: "img/moon.png",
            title: "달",
            description: "달을 픽셀로 만들어서 공의 이미지를 넣었습니다."
        },
        {
            key: "D",
            src: "img/Mercury.png",
            title: "천왕성",
            description: "천왕성을 픽셀로 만들어서 공의 이미지를 넣었습니다."
        },
        {
            key: "E",
            src: "img/mars.png",
            title: "목성",
            description: "목성을 픽셀로 만들어서 공의 이미지를 넣었습니다."
        },
        {
            key: "F",
            src: "img/행성1.png",
            title: "화성",
            description: "화성을 픽셀로 만들어서 공의 이미지를 넣었습니다."
        },
        {
            key: "G",
            src: "img/행성.png",
            title: "해왕성",
            description: "해왕성을 픽셀로 만들어서 공의 이미지를 넣었습니다."
        },
        {
            key: "H",
            src: "img/earth.png",
            title: "지구",
            description: "지구를 픽셀로 만들어서 공의 이미지를 넣었습니다."
        },
        {
            key: "I",
            src: "img/행성2.png",
            title: "토성",
            description: "토성을 픽셀로 만들어서 공의 이미지를 넣었습니다."
        },
        {
            key: "J",
            src: "img/heart.png",
            title: "하트",
            description: "게임에 들어갈 목숨을 픽셀로 만들었습니다."
        },
        {
            key: "K",
            src: "img/종이.png",
            title: "종이",
            description: "우주 쓰레기 중에 종이를 픽셀로 만들었습니다."
        },
        {
            key: "L",
            src: "img/인공위성.png",
            title: "인공위성",
            description: "오프닝에 들어갈 디자인 요소 인공위성을 픽셀로 만들었습니다."
        },
        {
            key: "M",
            src: "img/우주선.png",
            title: "우주선",
            description: "재미 요소로 외계인 우주선를 픽셀로 만들었습니다."
        },
        {
            key: "N",
            src: "img/칫솔.png",
            title: "칫솔",
            description: "우주 쓰레기 중에 플라스틱 쓰레기를 픽셀로 만들었습니다."
        },
        {
            key: "O",
            src: "img/우주1.png",
            title: "은하풍",
            description: "우주적 요소중 은하풍을 픽셀로 만들어서 오프닝에 넣었습니다."
        },
        {
            key: "P",
            src: "img/우주.png",
            title: "은하풍",
            description: "우주적 요소중 은하풍을 픽셀로 만들어서 오프닝에 넣었습니다."
        },
        {
            key: "Q",
            src: "img/우유.png",
            title: "우유",
            description: "우주 쓰레기 중에 우유를 픽셀로 만들어서 오프닝에 넣었습니다."
        },
        {
            key: "R",
            src: "img/쓰레기.png",
            title: "쓰레기",
            description: "우주 쓰레기 중에 비닐봉지를 픽셀로 만들어서 오프닝에 넣었습니다."
        },
        {
            key: "S",
            src: "img/별.png",
            title: "별",
            description: "우주적요소 별을 픽셀로 만들어서 오프닝에 넣었습니다."
        },
        {
            key: "T",
            src: "img/물.png",
            title: "물",
            description: "일회용 물 패트병을 픽셀로 만들었습니다."
        },
        {
            key: "U",
            src: "img/깡통.png",
            title: "캔",
            description: "캔을 픽셀로 만들었습니다."
        },
        {
            key: "V",
            src: "img/Untitled-1.png",
            title: "우주선",
            description: "우주로 날아가는 우주선을 픽셀로 만들어서 오프닝에 넣었습니다."
        },
        
        {
            key: "W",
            src: "img/Venus.png",
            title: "수성",
            description: "태양계 수성을 픽셀로 만들어서 넣었습니다."
        },
        {
            key: "X",
            src: "img/paddle.png",
            title: "패들",
            description: "공의 반사시키는 패들을 픽셀로 만들어서 게임에 넣었습니다."
        },
        {
            key: "Y",
            src: "index.html",
            title: "Image Y",
            description: "Description for Image Y"
        },
        {
            key: "Z",
            src: "img/z.png",
            title: "Image Z",
            description: "Description for Image Z"
        }
    ];

    // 키보드 이벤트 리스너 설정
    document.addEventListener("keydown", function(event) {
        const key = event.key.toUpperCase(); // 입력된 키를 대문자로 변환

        // Y키 첫화면
        if(key === "Y"){
            window.location.href = "end.html";
            return;
        }

        // Z키 페이지 이동
        if(key === "Z"){
            window.location.href = "index.html";
            return;
        }
        // 이미지 데이터를 찾아서 업데이트
        const imageData = images.find(img => img.key === key);
        if (imageData) {
            updateContent(imageData.src, imageData.title, imageData.description);
        } else {
            // 기본 이미지 데이터
            updateContent("default.png", "Default Title", "Default Description");
        }
    });

    // 내용을 업데이트하는 함수 정의
    function updateContent(imageSrc, title, description) {
        mainImage.src = imageSrc;
        imageTitle.textContent = title;
        imageDescription.textContent = description;
    }
});
