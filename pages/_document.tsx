import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import createEmotionServer from '@emotion/server/create-instance'
import Document, {
  Html,
  Main,
  NextScript,
  Head,
  DocumentContext,
} from 'next/document'
import React from 'react'

class HTMLDocument extends Document {
  static async getInitialProps(context: DocumentContext) {
    const originalRenderPage = context.renderPage

    const cache = createCache({ key: 'css' })
    const { extractCriticalToChunks } = createEmotionServer(cache)

    context.renderPage = () => {
      return originalRenderPage({
        enhanceApp: (App) => {
          // eslint-disable-next-line react/display-name
          return (props) => {
            return (
              <CacheProvider value={cache}>
                <App {...props} />
              </CacheProvider>
            )
          }
        },
      })
    }

    const initialProps = await Document.getInitialProps(context)

    const emotionStyles = extractCriticalToChunks(initialProps.html)
    const emotionStyleTags = emotionStyles.styles.map((style) => {
      return (
        <style
          data-emotion={`${style.key} ${style.ids.join(' ')}`}
          key={style.key}
          dangerouslySetInnerHTML={{ __html: style.css }}
        />
      )
    })

    return {
      ...initialProps,
      styles: [
        ...emotionStyleTags,
        ...React.Children.toArray(initialProps.styles),
      ],
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default HTMLDocument
