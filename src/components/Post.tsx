/* eslint-disable no-unused-vars */
import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';
import { ChangeEvent, FormEvent, useState } from 'react';

interface Author {
    name: string,
    role: string,
    avatarUrl: string,
}

interface Content {
    type: string ,
    content: string
}

interface PostProps {
    author: Author,
    publishedAt: Date,
    content: Content[]
}

export function Post({ author, publishedAt, content }: PostProps) {
    const [comments, setComments] = useState<string[]>([])

    const [newCommentText, setNewCommentText] = useState('')

    const publishedDateFormatted = format(publishedAt, "dd 'de' LLLL 'ás' HH:mm'h'", {
        locale: ptBR,
    })

    const publishedDateRelativeNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault()
        setComments([...comments, newCommentText])
        setNewCommentText("")
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }

    function handleNewCommentInvalid(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório')
    }

    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeleteOne = comments.filter(comment => comment !== commentToDelete)

        setComments(commentsWithoutDeleteOne)
    }

    const isNewCommentEmpty = newCommentText.length === 0

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>{publishedDateRelativeNow} </time>
            </header>
            <div className={styles.content}>
                {
                    content.map((line, index) => {
                        if (line.type === 'paragraph') {
                            return <p key={String(index)}>{line.content}</p>
                        } else if (line.type === 'link') {
                            return <p key={String(index)}><a> {line.content} </a></p>
                        }
                    })
                }
            </div>

            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea
                    name='comment'
                    value={newCommentText}
                    placeholder='Deixe seu feedback'
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />
                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>
            <div className={styles.commentList}>
                {
                    comments.map((comment) => (
                        <Comment
                            key={String(comment)}
                            content={comment}
                            onDeleteComment={deleteComment}
                        />
                    ))
                }
            </div>
        </article>
    )
}