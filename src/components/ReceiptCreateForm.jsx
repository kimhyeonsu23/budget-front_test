// src/components/UserForm.js
import React, { useState } from 'react';

function ReceiptCreateForm() {
    const [shop, setShop] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    //const [keywordName, setKeywordName] = useState('');
    const [date, setDate] = useState('');
    const [keywordId, setKeywordId] = useState('');
    const [userId, setUserId] = useState('');
/*
    function keywordNameToKeywordId(keywordName) {
        switch (keywordName) {

            case '외식': setKeywordId(0); break;
            case '생필품/생활비': setKeywordId(1); break;
            case '패션/미용/의류': setKeywordId(2); break;
            case '건강/병원비': setKeywordId(3); break;
            case '저축/투자': setKeywordId(4); break;
            case '교통': setKeywordId(5); break;

        }

    }*/

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 입력된 영수증 데이터를 객체로 만들기
        const receipt = {
            shop,
            userId,
            date,
            keywordId,
            totalPrice

        };

        // 백엔드 API에 POST 요청 보내기
        const response = await fetch('http://localhost:8082/receipt/createReceipt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(receipt), // 영수증 정보를 JSON 형태로 전송
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Receipt created:', data);
        } else {
            console.error('Error creating Receipt');
        }
    };

    return (
        <div>
            <h2>Create a new Receipt</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="shop">상점 이름 :</label>
                    <input
                        type="text"
                        id="shop"
                        value={shop}
                        onChange={(e) => setShop(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="totalPrice">총 금액 : </label>
                    <input
                        type="number"
                        id="totalPrice"
                        value={totalPrice}
                        onChange={(e) => setTotalPrice(e.target.value)}
                        required
                    />
                </div>
                {/* <div>
                    <label htmlFor="keywordName">영수증 키워드:</label>
                    <input
                        type="text"
                        id="keywordName"
                        value={keywordName}
                        onChange={(e) => setKeywrodName(e.target.value)}
                        required
                    />
                </div> */}
                <div>
                    <label htmlFor="keywordName">영수증 키워드: </label>
                    <select
                        id="keywordId"
                        value={keywordId}
                        onChange={(e) => setKeywordId(e.target.value)}
                        required
                    >
                        <option value="">-- 키워드를 선택하세요 --</option>
                        <option value="1">외식</option>
                        <option value="2">생활</option>
                        <option value="3">미용/패션</option>
                        <option value="4">건강</option>
                        <option value="5">저축/투자</option>
                        <option value="6">교통</option>
                    </select>

                </div>
                <div>
                    <label htmlFor="date">소비 날짜 :</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="userId">사용자 번호 :</label>
                    <input
                        type="number"
                        id="userId"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">영수증 등록하기</button>
            </form>
        </div>
    );
}

export default ReceiptCreateForm;
