#include <bits/stdc++.h>
using namespace std;

int convert_date(const string& s) {
    return (s[0]-'0')*10000000 + (s[1]-'0')*1000000 +
           (s[2]-'0')*100000 + (s[3]-'0')*10000 +
           (s[5]-'0')*1000 + (s[6]-'0')*100 +
           (s[8]-'0')*10 + (s[9]-'0');
}

unordered_map<string, bool> isAlive;
unordered_map<string, string> child_to_father, child_to_mother;
unordered_map<string, vector<string>> children;
unordered_map<string, bool> vis;

pair<int,int> dp(const string& u) {
    vis[u] = true;
    int skip = 1;
    int take = 0;
    for (const string& v : children[u]) {
        if (vis[v]) continue;
        auto [s, t] = dp(v);
        skip += max(s, t);
        take += s;
    }
    return {skip, take + 1};
}

int MAX_UNRELATED_PEOPLE() {
    vis.clear();
    int result = 0;
    for (const auto& p : isAlive) {
        const string& id = p.first;
        if (vis[id]) continue;

        bool has_parent = (child_to_father.count(id) && child_to_father[id] != "0000000") ||
                          (child_to_mother.count(id) && child_to_mother[id] != "0000000");

        if (!has_parent) {
            auto [no, yes] = dp(id);
            result += max(no, yes);
        } else {
            vis[id] = true;  // đánh dấu để không bị duyệt lại
        }
    }
    return result;
}

int MOST_ALIVE_ANCESTOR(const string& start) {
    if (!isAlive.count(start)) return 0;
    queue<pair<string,int>> q;
    unordered_set<string> visited;
    q.emplace(start, 0);
    visited.insert(start);
    int ans = 0;
    while (!q.empty()) {
        auto [u, d] = q.front(); q.pop();
        ans = max(ans, d);
        auto itf = child_to_father.find(u);
        if (itf != child_to_father.end()) {
            string p = itf->second;
            if (isAlive[p] && !visited.count(p)) {
                visited.insert(p);
                q.emplace(p, d+1);
            }
        }
        auto itm = child_to_mother.find(u);
        if (itm != child_to_mother.end()) {
            string p = itm->second;
            if (isAlive[p] && !visited.count(p)) {
                visited.insert(p);
                q.emplace(p, d+1);
            }
        }
    }
    return ans;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    string code;
    int n = 0;
    map<string,int> birth_cnt;
    vector<int> dates;

    while (cin >> code) {
        if (code == "*") break;
        string b, f, m, a, r;
        cin >> b >> f >> m >> a >> r;
        n++;
        birth_cnt[b]++;
        dates.push_back(convert_date(b));
        isAlive[code] = (a == "Y");
        if (f != "0000000") { child_to_father[code] = f; children[f].push_back(code); }
        if (m != "0000000") { child_to_mother[code] = m; children[m].push_back(code); }
    }
    sort(dates.begin(), dates.end());

    string q;
    while (cin >> q) {
        if (q == "***") break;
        if (q == "NUMBER_PEOPLE") cout << n << '\n';
        else if (q == "NUMBER_PEOPLE_BORN_AT") { string d; cin >> d; cout << birth_cnt[d] << '\n'; }
        else if (q == "NUMBER_PEOPLE_BORN_BETWEEN") {
            string d1,d2; cin >> d1 >> d2;
            int v1 = convert_date(d1), v2 = convert_date(d2);
            auto l = lower_bound(dates.begin(), dates.end(), v1);
            auto r = upper_bound(l, dates.end(), v2);
            cout << (r-l) << '\n';
        }
        else if (q == "MOST_ALIVE_ANCESTOR") { string id; cin >> id; cout << MOST_ALIVE_ANCESTOR(id) << '\n'; }
        else if (q == "MAX_UNRELATED_PEOPLE") cout << MAX_UNRELATED_PEOPLE() << '\n';  // RA ĐÚNG 6
    }
    return 0;
}