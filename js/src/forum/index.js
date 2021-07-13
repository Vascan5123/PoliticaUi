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


app.initializers.add('vascan/politica-ui', () => {

  extend(IndexPage.prototype, 'viewItems', function (items) {
    // Удаление кнопки сортировки
    if (items.has('sort')) {
      items.remove('sort');
    }
    // Добавляем текст сверху
    items.add(
      'Text_title_center_block',
      <p class="Text_title_center_block_class"><span> {app.translator.trans('politica-ui.forum.text_top_left')}</span></p>)

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
