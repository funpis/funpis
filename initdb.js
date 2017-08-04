var now = new Date();

db.accounts.remove({
    user_id: "user12345678",
});
var account = {
    user_id: "user12345678",
    username: "liupeng",
    password: "liupeng",
    email: "liupeng@test.com",
};
db.accounts.insert(account);

db.votes.remove({
    vote_id: "vote12345678",
});
var vote = {
    vote_id: "vote12345678",
    vote_title: "vote0001",
    promoter_id: "user12345678",
    publish_time: now,
    start_time: "",
    expire_time: new Date(now.getTime() + 1000 * 60 * 60 * 24 * 30),
    remove_time: "",
};
db.votes.insert(vote);

db.votetopics.remove({
    vote_id: "vote12345678",
});
var votetopic = {
    vote_id: "vote12345678",
    topic_title: "vote0001 topic",
    topic_content: "ali<br>egna<br>pnv<br>bgn<br>vba<br>omvnv<br>",
    topic_url: "",
};
db.votetopics.insert(votetopic);

db.votemenus.remove({
    vote_id: "vote12345678",
});
var votemenu = {
    vote_id: "vote12345678",
};
db.votemenus.insert(votemenu);

db.voteoptions.remove({
    vote_id: "vote12345678",
});
var voteoption = {
    vote_id: "vote12345678",
    option: [
    {id: 1, name: "01", note: "01 note", fix: true, ticket: 7886531},
    {id: 2, name: "02", note: "02 note", fix: false, ticket: 6832012},
    {id: 3, name: "03", note: "03 note", fix: true, ticket: 8532013},
    {id: 4, name: "04", note: "04 note", fix: false, ticket: 4865314},
    {id: 5, name: "05", note: "05 note", fix: true, ticket: 3650315},
    {id: 6, name: "06", note: "06 note", fix: true, ticket: 2880216},
    {id: 7, name: "07", note: "07 note", fix: false, ticket: 1568117},
    {id: 8, name: "08", note: "08 note", fix: true, ticket: 720888},
    {id: 9, name: "09", note: "09 note", fix: true, ticket: 856208},
    {id: 10, name: "10", note: "10 note", fix: true, ticket: 7098989},
    {id: 11, name: "11", note: "11 note", fix: true, ticket: 5101828}
    ],
};
db.voteoptions.insert(voteoption);

db.votecomments.remove({
    vote_id: "vote12345678"
});
var votecomment1 = {
    vote_id: "vote12345678",
    comment_id: "votecomment1",
    parent_id: "",
    former_id: "",
    commenter_id: "user12345678",
    comment_time: now,
    content: "test comment 1<br><img src='http://voterun.com:3000/funimg/zhen.jpg'/>",
    good: 111,
    bad: 222,
    remove_time: "",
};
var votecomment2 = {
    vote_id: "vote12345678",
    comment_id: "votecomment2",
    parent_id: "votecomment1",
    former_id: "",
    commenter_id: "user12345678",
    comment_time:  new Date(now.getTime() + 1000 * 60),
    content: "test comment 2<br><img src='http://voterun.com:3000/funimg/29.gif'/>",
    good: 333,
    bad: 444,
    remove_time: "",
};
var votecomment3 = {
    vote_id: "vote12345678",
    comment_id: "votecomment3",
    parent_id: "votecomment1",
    former_id: "votecomment2",
    commenter_id: "user12345678",
    comment_time:  new Date(now.getTime() + 1000 * 60 * 2),
    content: "test comment 3<br><img src='http://voterun.com:3000/funimg/einstein01.jpg'/>",
    good: 555,
    bad: 666,
    remove_time: "",
};
var votecomment4 = {
    vote_id: "vote12345678",
    comment_id: "votecomment4",
    parent_id: "votecomment1",
    former_id: "votecomment2",
    commenter_id: "user12345678",
    comment_time:  new Date(now.getTime() + 1000 * 60 * 3),
    content: "test comment 4<br><img src='http://voterun.com:3000/funimg/beijing.jpg'/>",
    good: 777,
    bad: 888,
    remove_time: "",
};
db.votecomments.insert(votecomment1);
db.votecomments.insert(votecomment2);
db.votecomments.insert(votecomment3);
db.votecomments.insert(votecomment4);

/*
db.tags.remove({
    tag_id: "votetag12345"
});

db.votetags.remove({
    vote_id: "vote12345678",
    tag_id: "votetag12345"
});

db.votetickets.remove({
    vote_id: "abcdefghijkl"
});
 
db.votecommenttaps.remove({
    vote_id: "abcdefghijkl"
});
*/
