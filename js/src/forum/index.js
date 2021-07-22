import app from 'flarum/common/app';
import { extend, override } from 'flarum/extend';
import IndexPage from 'flarum/components/IndexPage';
import DiscussionsUserPage from 'flarum/components/DiscussionsUserPage';
import LinkButton from 'flarum/components/LinkButton';
import DiscussionList from 'flarum/components/DiscussionList';
import ComposerBody from 'flarum/components/ComposerBody';
import DiscussionListItem from 'flarum/components/DiscussionListItem';
import TagHero from 'flarum/tags/components/TagHero';
import TextEditor from 'flarum/components/TextEditor';
import CardItem from './components/CardItem.js';


app.initializers.add('vascan/politica-ui', () => {
  CardItem();
  extend(IndexPage.prototype, 'viewItems', function (items) {
    // Удаление кнопки сортировки
    if (items.has('sort')) {
      items.remove('sort');
    }

    const params = app.search.stickyParams();

    items.add(
      'allDiscussions',
      LinkButton.component(
        {
          href: app.route('index', params),
          icon: 'far fa-list-alt',
          className: "Text_title_center_block_class"
        },
        app.translator.trans('core.forum.index.all_discussions_link')
      ),
      100
    );

  });

  extend(IndexPage.prototype, 'navItems', function (items) {

    if (items.has('allDiscussions')) {
      items.remove('allDiscussions');
    }

  });

  extend(IndexPage.prototype, 'actionItems', function (items) {
    // Stergerea butoanelor existente
    if (items.has('refresh')) {
      items.remove('refresh');
    }
    if (items.has('markAllAsRead')) {
      items.remove('markAllAsRead');
    }



    items.add(
      'Actuale',
      LinkButton.component({
        title: "Actuale",
        className: 'Button Button--primary',
        href: '/',
      },
        app.translator.trans('politica-ui.forum.sort_button_1')
      )
    );

    items.add(
      'Citite',
      LinkButton.component({
        title: "Citite",
        className: 'Button Button--primary',
        href: '/?sort=top',
      },
        app.translator.trans('politica-ui.forum.sort_button_2')
      )
    );

    items.add(
      'Noi',
      LinkButton.component({
        title: "Noi",
        className: 'Button Button--primary',
        href: '/?sort=newest',
      },
        app.translator.trans('politica-ui.forum.sort_button_3')
      )
    );

    items.add(
      'Vechi',
      LinkButton.component({
        title: "Vechi",
        className: 'Button Button--primary',
        href: '/?sort=oldest',
      },
        app.translator.trans('politica-ui.forum.sort_button_4')
      )
    );




  });



});
