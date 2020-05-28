// Components
Vue.component('menu-link', {
  props: ['link'],
  template: `
    <div class="menu-link">
      <a :href="link.link" @click="$emit('moving')">{{ link.text }}</a>
    </div>
  `
})

Vue.component('skill-item', {
  props: ['skill'],
  template: `
    <div class="skills-item">
      <div class="skills-item__content">
        <div class="skill-title">
          <div class="skill-title__left"> {{ skill.text }} </div>
          <div class="skill-title__right">
            <span> {{ skill.skill }} </span> / <span>100%</span>
          </div>
        </div>
        <div class="skill-way">
          <span class="skill-way__passed" :style="{ width: skill.skill + '%' }"></span>
        </div>
      </div>
    </div>
  `
})

Vue.component('portfolio-item', {
  props: ['portfolio'],
  template: `
    <div class="portfolio-list__item" @click.prevent="$emit('showup')">
      <div class="item-content">
        <div class="item-content__title">
          {{ portfolio.text }}
        </div>
        <a class="item-content__link">Открыть</a>
      </div>
      <img :src="'images/' + portfolio.img.url + '.png'" :alt="portfolio.img.alt" />
    </div>
  `
})

Vue.component('popup-tools', {
  props: ['tool'],
  template: `
    <div class="popup-tools__item">
      {{ tool }}
    </div>
  `
})

Vue.component('portfolio-btn', {
  props: ['btn'],
  template: `
    <div @click.prevent="$emit('rendor')">
      {{ btn }}
    </div>
  `
})

var app = new Vue({
  el: '#app',
  data: {
    menuActive: false, // Переменная отвечающая за добавления классов меню при клике
    menuScroll: false, // Переменная отвечающая за добавление класса при скролле
    reziseMenu: false, // Переменная отвечающая за отображение мобильного меню, при разрешении <768 становится true
    menuLinks: [{ // Массив ссылок для меню
        text: 'Главная',
        link: '#home'
      },
      {
        text: 'Навыки',
        link: '#skills'
      },
      {
        text: 'Портфолио',
        link: '#portfolio'
      }
    ],
    skillList: [{text: 'html', skill: 95}, {text: 'css', skill: 90}, {text: 'js', skill: 60}, {text:    'jQuery', skill: 25}, {text: 'flex-box', skill: 99}, {text: 'bootstrap', skill: 80}, {text: 'sass', skill: 30}, {text: 'gulp 4', skill: 30}, {text: 'git', skill: 20}, {text: 'photoshop', skill: 15}, {text: 'Vue.js', skill: 5}], // Массив навыков
    portfolioList: [{ // Массив элементов портфолио
        text: 'Лендинг "Business Assets"',
        img: {
          url: 'business-assets',
          alt: 'Business Assets'
        },
        category: 'web'
      },
      {
        text: 'Одностраничник "Design Kitchen"',
        img: {
          url: 'kitchen',
          alt: 'Design Kitchen'
        },
        category: 'web'
      },
      {
        text: 'Лендинг "Proart Fitness"',
        img: {
          url: 'proart',
          alt: 'Proart Fitness'
        },
        category: 'web'
      },
      {
        text: 'Многостраничник "White Field Capital"',
        img: {
          url: 'whitefield',
          alt: 'White Field Capital'
        },
        category: 'web'
      },
      {
        text: 'Лендинг "Piroll Design"',
        img: {
          url: 'pirolldesign',
          alt: 'Piroll Design'
        },
        category: 'web'
      },
      {
        text: 'Учебник по Flex-box "Flexbox Book"',
        img: {
          url: 'flexboxbook',
          alt: 'Flexbox Book'
        },
        category: 'js'
      }
    ],
    portfolioBtns: ['all', 'web', 'js'], // Массив кнопок для фильтрации портфолио
    currentRendor: 'all', // Переменная отвечающая за отображение элементов портфолио при фильтрации
    // Popup
    activePopup: 0, // Номер активного попапа для портфолио
    showPopup: false,
    showPopupPortfolio: false,
    showPopupFeedback: false,
    popups: [{ // Массив элементов для отображения попапа активного элемента портфолио
        title: 'Лендинг "Business Assets"',
        description: 'Верстка лендинга "Business Assets", состоящего из 3-х экранов, слайдера и формы обратной связи.',
        tools: ['html', 'css', 'bootstrap 4', 'gulp 4', 'sass', 'owl-carousel 2', 'js / jQuery'],
        date: '3 дня',
        budget: '30 $',
        url: {
          text: 'BusinessAssets',
          link: 'https://rust4mchik.github.io/BusinessAssets'
        },
        preview: {
          url: 'https://content.freelancehunt.com/snippet/876b9/aac0e/1073337/FireShot+Capture+008+Деловые+активы.png',
          alt: 'Business Assets'
        }
      },
      {
        title: 'Одностраничник "Design Kitchen"',
        description: 'Верстка одностраничника "Design Kitchen" из макета в figma.',
        tools: ['html', 'css', 'bootstrap 4', 'gulp 4', 'sass', 'js / jQuery', 'figma'],
        date: '1 день',
        budget: '20 $',
        url: {
          text: 'DesignKitchen',
          link: 'https://rust4mchik.github.io/DesignKitchen'
        },
        preview: {
          url: 'https://content.freelancehunt.com/snippet/6803b/1f076/968558/mGl_J0pYBBM.jpg',
          alt: 'Design Kitchen'
        }
      },
      {
        title: 'Лендинг "Proart Fitness"',
        description: 'Верстка лендинга "Proart Fitness", состоящего из 10 экранов, настройка 4-ех слайдеров.',
        tools: ['html', 'css', 'bootstrap 4', 'gulp 4', 'sass', 'js / jQuery', 'owl-carousel 2'],
        date: '5 дней',
        budget: '70 $',
        url: {
          text: 'ProartFitness',
          link: 'https://rust4mchik.github.io/ProartFitness/'
        },
        preview: {
          url: 'https://content.freelancehunt.com/snippet/c4911/4c1ed/939054/FireShot+Capture+-+Proart+Fitness+-+rust4mchik.github.io.png',
          alt: 'Proart Fitness'
        }
      },
      {
        title: 'Многостраничник "White Field Capital"',
        description: 'Верстка многостраничника "White Field Capital", состоящего из 4-ех страниц, настройка формы обратной связи без перезагрузки страницы (PHP + Ajax).',
        tools: ['html', 'css', 'bootstrap 4', 'gulp 4', 'sass', 'js / jQuery', 'PHP', 'Ajax'],
        date: '4 дня',
        budget: '70 $',
        url: {
          text: 'WhiteFieldCapital',
          link: 'https://rust4mchik.github.io/WhiteFieldCapital/'
        },
        preview: {
          url: 'https://content.freelancehunt.com/snippet/3ee2d/fbfd6/920070/FireShot+Capture+014+-+WhiteField+Capital+-+.png',
          alt: 'White Field Capital'
        }
      },
      {
        title: 'Лендинг "Piroll Design"',
        description: 'Верстка лендинга "Piroll Design", состоящего из 7-ми экранов и формы обратной связи.',
        tools: ['html', 'css', 'flex-box', 'gulp 4', 'sass', 'js / jQuery'],
        date: '3 дня',
        budget: '50 $',
        url: {
          text: 'PirollDesign',
          link: 'https://rust4mchik.github.io/PirollDesign/'
        },
        preview: {
          url: 'https://content.freelancehunt.com/snippet/a4664/39d9b/927301/FireShot+Capture+035+-+Piroll+Design+-+rust4mchik.github.io.png',
          alt: 'Piroll Design'
        }
      },
      {
        title: 'Учебник по Flex-box "Flexbox Book"',
        description: 'Учебник по технологии построения гибких макетов сайта CSS3 Flexbox. Состоящий из 15 практических уроков, где необходимо изучать и применять свойства flexbox под средством мини-игры.',
        tools: ['html', 'css', 'flex-box', 'gulp 4', 'sass', 'js / jQuery', 'json'],
        date: '~ дней',
        budget: '~ $',
        url: {
          text: 'FlexboxBook',
          link: 'https://rust4mchik.github.io/FlexboxBook/'
        },
        preview: {
          url: 'images/flexboxbook.png',
          alt: 'Flexbox Book'
        }
      }
    ]
  },
  methods: { // Функции работы с данными
    mobileMenu: function () {
      this.menuActive = !this.menuActive
    },
    resizeClient: function () {
      if (document.documentElement.clientWidth < 768)
        this.reziseMenu = true
      else {
        this.reziseMenu = false
        this.menuActive = false
      }
    },
    scrollClient: function () {
      window.top.scrollY > 70 ? this.menuScroll = true : this.menuScroll = false
    },
    movingAnchor: function (event) {
      event.preventDefault()
      let anchor = event.target.getAttribute('href')
      window.scroll({
        left: 0,
        top: document.querySelector(anchor).offsetTop,
        behavior: 'smooth'
      })
    },
    showUpPopupPortfolio: function(index) {
      this.activePopup = index
      this.showPopup = true
      this.showPopupPortfolio = true
      document.querySelector('html').classList.add('hidden')
    },
    showUpPopupFeedback: function() {
      this.showPopup = true
      this.showPopupPortfolio = false
      this.showPopupFeedback = true
      document.querySelector('html').classList.add('hidden')
    },
    fadeOutPopup: function() {
      this.showPopup = false
      this.showPopupPortfolio = false
      this.showPopupFeedback = false
      document.querySelector('html').classList.remove('hidden')
    }
  },
  mounted() { // хук жизненного цикла экземпляра
    this.$nextTick(function () { 
      window.addEventListener('resize', this.resizeClient);
      window.addEventListener('load', this.scrollClient);
      window.addEventListener('scroll', this.scrollClient);
      //Init
      this.resizeClient()
      this.scrollClient()
    })
  },
  beforeDestroy() { // хук жизненного цикла экземпляра
    window.removeEventListener('resize', this.resizeClient);
    window.removeEventListener('load', this.scrollClient);
    window.removeEventListener('scroll', this.scrollClient);
  }
})