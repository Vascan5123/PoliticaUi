import app from 'flarum/common/app';
import { extend, override } from 'flarum/extend';
import DiscussionListItem from 'flarum/components/DiscussionListItem';
import DiscussionControls from 'flarum/utils/DiscussionControls';
import Dropdown from 'flarum/components/Dropdown';
import icon from 'flarum/helpers/icon';
import Link from 'flarum/components/Link';
import extractText from 'flarum/utils/extractText';
import humanTime from 'flarum/utils/humanTime';
import avatar from 'flarum/helpers/avatar';
import listItems from 'flarum/helpers/listItems';
import highlight from 'flarum/helpers/highlight';
import abbreviateNumber from 'flarum/utils/abbreviateNumber';

import { escapeRegExp } from 'lodash-es';
export default function () {

    /* extend(DiscussionListItem.prototype, 'view', function (items) {
        let elem = items.children[items.children.length - 1];
        console.log(elem);
    }) */

    override(DiscussionListItem.prototype, 'view', function () {
        const discussion = this.attrs.discussion;
        const user = discussion.user();
        const isUnread = discussion.isUnread();
        const isRead = discussion.isRead();
        const showUnread = !this.showRepliesCount() && isUnread;
        let jumpTo = 0;
        const controls = DiscussionControls.controls(discussion, this).toArray();
        const attrs = this.elementAttrs();

        if (this.attrs.params.q) {
            const post = discussion.mostRelevantPost();
            if (post) {
                jumpTo = post.number();
            }

            const phrase = escapeRegExp(this.attrs.params.q);
            this.highlightRegExp = new RegExp(phrase + '|' + phrase.trim().replace(/\s+/g, '|'), 'gi');
        } else {
            jumpTo = Math.min(discussion.lastPostNumber(), (discussion.lastReadPostNumber() || 0) + 1);
        }

        let tags = listItems(this.infoItems().toArray())[0];

        let terminalPost;
        for (let x = 0; x < listItems(this.infoItems().toArray()).length; x++) {
            if (listItems(this.infoItems().toArray())[x].key) {
                if (listItems(this.infoItems().toArray())[x].key == "terminalPost") {
                    terminalPost = listItems(this.infoItems().toArray())[x];
                }
            }
        }

        let tagLength = tags.children[0].children.length;

        for (let i = 0; i < tagLength; i++) {
            if ((tags.children[0].children[i].children[0].children[0].tag != "i") && (tags.children[0].children[i].attrs.className.includes("TagLabel--child") == false)) {
                tags.children[0].children[i].attrs.className += " d-none"
                /* console.log(tags.children[0].children[i].attrs.className) */
            }
        }

        function likes() {
            if (discussion.data.attributes.votes) {
                return discussion.votes()
            } else {
                return "0"
            }
        }


        return (
            <div {...attrs}>
                {controls.length
                    ? Dropdown.component(
                        {
                            icon: 'fas fa-ellipsis-v',
                            className: 'DiscussionListItem-controls',
                            buttonClassName: 'Button Button--icon Button--flat Slidable-underneath Slidable-underneath--right',
                            accessibleToggleLabel: app.translator.trans('core.forum.discussion_controls.toggle_dropdown_accessible_label'),
                        },
                        controls
                    )
                    : ''}

                <span
                    className={'Slidable-underneath Slidable-underneath--left Slidable-underneath--elastic' + (isUnread ? '' : ' disabled')}
                    onclick={this.markAsRead.bind(this)}
                >
                    {icon('fas fa-check')}
                </span>

                <div className={'DiscussionListItem-content Slidable-content' + (isUnread ? ' unread' : '') + (isRead ? ' read' : '')}>
                    {/* <Tooltip
                        text={app.translator.trans('core.forum.discussion_list.started_text', { user, ago: humanTime(discussion.createdAt()) })}
                        position="right"
                    >
                        <Link className="DiscussionListItem-author" href={user ? app.route.user(user) : '#'}>
                            {avatar(user, { title: '' })}
                        </Link>
                    </Tooltip> */}

                    <Link href={app.route.discussion(discussion, jumpTo)} className="DiscussionListItem-options">

                        {/* <div className="DiscussionListItem-options-blocks">
                            <Link className="" href={user ? app.route.user(user) : '#'}>
                                {avatar(user, { title: '' })}
                            </Link>
                        </div> */}

                        <div className="DiscussionListItem-options-blocks">
                            <h3 className="">{highlight(likes(), this.highlightRegExp)}</h3>
                            <p className="">{app.translator.trans('politica-ui.forum.likes')}</p>
                        </div>

                        <div className="DiscussionListItem-options-blocks">
                            <h3 className="">{highlight(discussion.commentCount() - 1, this.highlightRegExp)}</h3>
                            <p className="">{app.translator.trans('politica-ui.forum.answers')}</p>
                        </div>

                        <div className="DiscussionListItem-options-blocks">
                            <h3 className="">{highlight(discussion.viewCount(), this.highlightRegExp)}</h3>
                            <p className="">{app.translator.trans('politica-ui.forum.views')}</p>
                        </div>

                    </Link>

                    <ul className="DiscussionListItem-badges badges">{listItems(discussion.badges().toArray())}</ul>

                    <Link href={app.route.discussion(discussion, jumpTo)} className="DiscussionListItem-main">
                        <h3 className="DiscussionListItem-title">{highlight(discussion.title(), this.highlightRegExp)}</h3>

                        <ul className="DiscussionListItem-info">{listItems(this.infoItems().toArray())[listItems(this.infoItems().toArray()).length - 1]}</ul>
                        <div className="DiscussionListItem_tags_and_author">
                            <ul className="DiscussionListItem-info-tags">{tags}</ul>
                            <div className="DiscussionListItem-options-author">
                                <Link className="author-link" href={user ? app.route.user(user) : '#'}>
                                    {avatar(user, { title: '' })}
                                    <div>
                                        <p>{
                                        
                                        console.log(user),
                                        user.data.attributes.displayName}</p>
                                        <p>{listItems(terminalPost)}</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </Link>

                    <span
                        tabindex="0"
                        role="button"
                        className="DiscussionListItem-count"
                        onclick={this.markAsRead.bind(this)}
                        title={showUnread ? app.translator.trans('core.forum.discussion_list.mark_as_read_tooltip') : ''}
                    >
                        {abbreviateNumber(discussion[showUnread ? 'unreadCount' : 'replyCount']())}
                    </span>
                </div>
            </div>
        );
    });
}