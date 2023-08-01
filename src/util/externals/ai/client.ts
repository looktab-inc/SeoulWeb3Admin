class AIHelper {
  async makeImage (description: string) {
    return new Promise((resolve, reject) => {
      fetch('/ai/stability', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: description
        }),
      })
        .then(response => response.json())
        .then(data => {
          // API 호출이 성공한 경우 데이터 처리
          console.log(data);
          resolve(data.result);
        })
        .catch(error => {
          // API 호출이 실패한 경우 에러 처리
          console.error('Error:', error);
          reject(error);
        });
    })
  }

  makeText(keyword: string, tone: string) {
    return new Promise((resolve, reject) => {
      fetch('/ai/gpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tone: tone,
          keyword: keyword
        }),
      })
        .then(response => response.json())
        .then(data => {
          // API 호출이 성공한 경우 데이터 처리
          console.log(data);
          resolve(data.result);
        })
        .catch(error => {
          // API 호출이 실패한 경우 에러 처리
          console.error('Error:', error);
          reject(error);
        });
    })

  }
}

export default AIHelper