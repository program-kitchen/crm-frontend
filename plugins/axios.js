// レスポンスエラーコード毎の対応処理を追加
export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    console.log('Making request to ' + config.url )
  })
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if(code === 422 ){
      window.alert('予期せぬエラーが発生しました');
      redirect('/')
    } else if ([404,405, 500].includes(code)) {
      redirect('/error')
    } else if (code === 403) {
      redirect('/')
    } else {
      error = 'アクセストークンが失効しています'
    }
  })
}
